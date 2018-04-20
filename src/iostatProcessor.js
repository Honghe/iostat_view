// const fs = require('fs');
//
// var text = fs.readFileSync("../public/data/demo.iostat", 'utf8');

function extractData(text) {

    var datas = []
    var diskLegend = []
    var isDiskLegendGet = false
    var row = []
    var timeSeries = []

    text.split(/\n/).forEach(function (line, lineIndex) {
        // console.log(line)
        // extract date time ISO 8601
        if(line.match(/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/g)) {
            // console.log(line)
            // push row
            if(row.length > 0) {
                datas.push(row);
            }
            // new row
            row = []
            // push time
            timeSeries.push(line)
        }

        // extract legend
        if (line.startsWith("Device:")) {
            if (isDiskLegendGet === false) {
                line.split(/\s/).forEach(function (item, index) {
                    if ((index !== 0) && (item.length > 0)) {
                        diskLegend.push(item);
                    }
                })
                isDiskLegendGet = true;
            }
        }

        // TODO support multi disk
        if (line.startsWith('sd')) {
            line.split(/\s/).forEach(function (item, index) {
                if((index !== 0) && (item.length >0)) {
                    row.push(item)
                }
            })
        }
    });


// push last row
    if(row.length > 0) {
        datas.push(row);
    }

    // console.log(diskLegend);
    // console.log(datas)

    return {diskLegend, datas, timeSeries}
}

// extractData(text)

export default extractData;