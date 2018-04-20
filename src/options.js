
import echarts from 'echarts/lib/echarts'
import moment from "moment";

//折线图数据

// export var lineOption = {
//     legend: {},
//     tooltip: {},
//     dataset: {
//         // 提供一份数据。
//         source: [
//             ['product', '2015', '2016', '2017'],
//             ['Matcha Latte', 43.3, 85.8, 93.7],
//             ['Milk Tea', 83.1, 73.4, 55.1],
//             ['Cheese Cocoa', 86.4, 65.2, 82.5],
//             ['Walnut Brownie', 72.4, 53.9, 39.1]
//         ]
//     },
//     // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
//     xAxis: {type: 'category'},
//     // 声明一个 Y 轴，数值轴。
//     yAxis: {},
//     // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
//     series: [
//         {type: 'line'},
//         {type: 'line'},
//         {type: 'line'}
//     ]
// }
export var lineOption = {
    title: {
        // text: 'title'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        // type: 'scroll',
        orient: 'vertical',
        right: 30,
        top: 20,
        bottom: 20,

        // selected: data.selected
        // data: []
        // data: ["rrqm/s", "wrqm/s", "r/s", "w/s", "rMB/s", "wMB/s", "avgrq-sz", "avgqu-sz", "await", "r_await", "w_await", "svctm", "%util"]
        // data: ['a', 'b']
    },
    toolbox: {
        left: 'center',
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            // saveAsImage: {}
        }
    },
    // dataZoom: [{
    // }, {
    //     type: 'inside'
    // }],
    grid: {
        left: '3%',
        right: '10%',
        bottom: '3%',
        containLabel: true
    },
    xAxis:
        {
            type: 'category',
            // "axisLabel": {
            // "formatter": "YYYY-MM-DDTHH:mm:ssZ",
            // },
            axisLabel:{
                formatter: function (value, index)
                {
                    // console.log("format", value,index)
                    return moment(value).format("hh:mm:ss");
                    // return echarts.format.formatTime('YYYY-MM-DDTHH:mm:ssZ', new Date(value));
                }
            },
            // data: ["2018-04-19T04:12:23", "2018-04-19T04:25:23", "2018-04-19T04:3-:23", "2018-04-19T04:45:23"]
        }
    ,
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        // {
        //     // name: ['a', 'b'],
        //     type: 'line',
        //     // stack: '总量',
        //     data: [1, 2, 3, 4]
        // }
    ]
};