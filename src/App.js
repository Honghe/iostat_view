import React, {Component} from 'react';
import './App.css';
import {Row, Col} from 'antd';
import {lineOption} from './options'
import {Tree} from 'antd';
import 'antd/dist/antd.css';
import Dropzone from 'react-dropzone'
import {LineReact, updateChartFile} from './LineReact';
import extractData from './iostatProcessor'

const TreeNode = Tree.TreeNode;

class DropArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {files: []}
    }

    onDrop(files) {
        this.props.updateFileList(files);
        this.setState({
            files
        });
    }

    render() {
        return (
            <section>
                <div className="dropzone">
                    <Dropzone onDrop={this.onDrop.bind(this)}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>
                {/*<aside>*/}
                {/*<h2>Dropped files</h2>*/}
                {/*<ul>*/}
                {/*{this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}*/}
                {/*</ul>*/}
                {/*</aside>*/}
            </section>
        );
    }
}


class DataTree extends React.Component {
    state = {
        expandedKeys: ['data'],
        autoExpandParent: true,
        selectedKeys: [],
        treeData: [{
            title: 'data',
            key: 'data',
            children: [
                // {title: '0-0-0-0', key: '0-0-0-0'},
            ],
        }]
    }

    componentWillReceiveProps(nextProps) {
        console.debug("componentWillReceiveProps")
        var treeData = [{
            title: 'data',
            key: 'data',
            children: nextProps.list,
        }]
        this.state.treeData = treeData;
    }

    onExpand = (expandedKeys) => {
        console.debug('onExpand', arguments);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: true,
        });
    }
    onSelect = (selectedKeys, info) => {
        console.debug('onSelect', selectedKeys, info);
        this.props.selectFile(selectedKeys[0])
        this.setState({selectedKeys});
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }

    render() {
        return (
            <Tree
                onExpand={this.onExpand}
                expandedKeys={this.state.expandedKeys}
                autoExpandParent={this.state.autoExpandParent}
                onSelect={this.onSelect}
                selectedKeys={this.state.selectedKeys}
            >
                {this.renderTreeNodes(this.state.treeData)}
            </Tree>
        );
    }
}

//转置
function transpose(a) {
    return a[0].map(function (_, c) {
        return a.map(function (r) {
            return r[c];
        });
    });
    // or in more modern dialect
    // return a[0].map((_, c) => a.map(r => r[c]));
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {files: [], filelist: []}
        this.updateFileList = this.updateFileList.bind(this)
        this.selectFile = this.selectFile.bind(this)
        this.state.dataset = {}
    }

    selectFile(fileName) {
        const reader = new FileReader();
        reader.onload = () => {
            // console.debug(reader.result);
            console.log("file read.")
            var state = this.state
            state.dataset = extractData(reader.result);
            lineOption.legend = {
                data: this.state.dataset.diskLegend,
                itemHeight: 16
            }
            // set default no render
            lineOption.legend.selected = {}
            lineOption.legend.data.forEach(function (item) {
                lineOption.legend.selected[item] = false
            })
            // 分解line
            //reset
            lineOption.series = []
            // trans
            var datas_trans = transpose(state.dataset.datas)
            datas_trans.forEach(function (row, rindex) {
                var line = []
                row.forEach(function (item, cellIndex) {
                    line.push(item)
                });
                lineOption.series.push({
                    type: 'line',
                    name: lineOption.legend.data[rindex],
                    areaStyle: {normal: {}},
                    // 根据名字对应到相应的系列
                    // name: this.state.dataset.diskLegend,
                    data: line,
                    markLine: {
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                // color: '#1e90ff',
                                label: {
                                    show: true,
                                    // formatter: function (param) {
                                    //     return Math.round(param.value / 10000) + ' 万'
                                    // }
                                }
                            }
                        },
                        data: [
                            {type: 'average', name: 'average'}
                        ]
                    }
                })
            })
            lineOption.xAxis.data = state.dataset.timeSeries
            this.setState(this.state)
        };
        reader.onabort = () => console.debug('file reading was aborted');
        reader.onerror = () => console.debug('file reading has failed');
        // find the file
        this.state.files.forEach(function (item) {
            if (item.name === fileName) {
                console.log("file begin read.")
                reader.readAsText(item);
            }
        })
    }

    updateFileList(files) {
        var state = this.state;
        state.files = files
        var list = []
        files.forEach(file => {
            list.push({title: file.name, key: file.name})
        })
        state.filelist = list
        console.debug("updateFileList", this.state)
        this.setState(this.state)
    }

    render() {
        return (
            <div>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">iostat view</h1>
                    </header>
                </div>
                <div>
                    <DropArea updateFileList={this.updateFileList}/>
                </div>
                <div>
                    <Row>
                        <Col span={5}>
                            <DataTree list={this.state.filelist} selectFile={this.selectFile}/>
                        </Col>
                        <Col span={19}>
                            <LineReact option={lineOption}/>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default App;
