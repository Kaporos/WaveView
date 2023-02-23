import {ChartData, ChartDataset} from "chart.js";
import {resolve} from "chart.js/helpers";
const COLORS = {
    "A": "rgb(37,150,190)",
    "B": "rgb(255, 99, 132)"

}

export async function parseCSV(file: File): Promise<ChartData<"scatter">> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (!(typeof reader.result == "string")) {
                reject("Error bro !")
                return
            }
            const data: string = reader.result
            let lines = data.replace("\r","").split("\n").filter((x,i) => i % 3 == 0)
            console.log(lines[0])
            let graphData: ChartDataset<"scatter">[] = []
            lines.forEach((line: string) => {
                let charts: string[];
                let x: string;
                [x, ...charts] = line.split(";")
                charts.forEach((chart, index) => {
                    if (graphData.length < index + 1){
                        let letter = String.fromCharCode(65 + index)
                        // @ts-ignore
                        let color = Object.keys(COLORS).includes(letter) ? COLORS[letter] : "#" + Math.floor(Math.random()*16777215).toString(16)
                        graphData.push({
                            //@ts-ignore
                            label: letter,
                            data: [],
                            borderColor: color,
                            showLine: true,
                            pointStyle: false,
                        })
                    }

                    let dt = {x:parseFloat(x.replace(",",".")), y:parseFloat(chart.replace(",","."))}
                    if (!isNaN(dt.x) && !isNaN(dt.y)) {
                        graphData[index].data.push(dt)
                    }
                })
            })
            console.log(graphData)
            resolve({
                datasets: graphData
            })
        }
        reader.readAsText(file)
    })

}

