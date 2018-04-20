import React from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/dataZoom'


// function updateChartFile(file) {
//     this.setState({file})
// }

class LineReact extends React.Component {

    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        // updateChartFile = updateChartFile.bind(this)
        this.state ={option: props.option}
    }

    init() {
        const {option = {}} = this.props //外部传入的data数据
        let myChart = echarts.init(this.ID) //初始化echarts
        // this.myChart = myChart

        //设置options
        myChart.setOption(option)
        window.onresize = function () {
            myChart.resize()
        }
    }

    // for partial update
    // componentWillReceiveProps(nextProps) {
    //     console.debug("LineChart componentWillReceiveProps")
    //     // 填入数据
    //     // this.myChart.setOption({
    //     //     legend: {data: nextProps.diskLegend},
    //     //     series: [{
    //     //         // 根据名字对应到相应的系列
    //     //         name: nextProps.diskLegend,
    //     //         data: nextProps.data
    //     //     }]
    //     // });
    //     this.myChart.setOption(nextProps)
    //     this.setState(this.state)
    // }

    componentDidMount() {
        console.log("linechart componentDidMount")
        this.init()
    }

    componentDidUpdate() {
        console.log("linechart componentDidUpdate")
        this.init()
    }

    render() {
        const {width = "100%", height = "560px"} = this.props
        return <div ref={ID => this.ID = ID} style={{width, height}}></div>
    }
}

export {
    // updateChartFile,
    LineReact,
}

