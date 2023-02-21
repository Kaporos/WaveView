import {useCallback, useEffect, useState} from 'preact/hooks'
import './app.css'
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart, Filler, Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement, ScatterController
} from "chart.js";
import {createRef} from "preact";
import {useDropzone} from "react-dropzone";
import zoomPlugin from 'chartjs-plugin-zoom';
import {canvas} from "chart.js/helpers";


const plugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const {ctx} = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || '#99ffff';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};

Chart.register(plugin,CategoryScale, LinearScale, BarController, BarElement, LineElement, LineController, PointElement, ScatterController, Legend, zoomPlugin, Filler)

const COLORS = {
  "A": "rgb(37,150,190)",
  "B": "rgb(255, 99, 132)"

}

export function App() {
  const [count, setCount] = useState(0)
  const canvasRef = createRef();
  const [chart, setChart] = useState(undefined)
  const [data, setData] = useState([])
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        //@ts-ignore
        const data: string = reader.result
        let lines = data.replace("\r","").split("\n")
        let graphData: any[][] = []
        lines.forEach((line: string) => {
          let charts: string[];
          let x: string;
          [x, ...charts] = line.split(";")
          charts.forEach((chart, index) => {
            if (graphData.length < index + 1){
              let color = Object.keys(COLORS)[index]
              graphData.push({
                //@ts-ignore
                label: color,
                data: [],
                borderColor: COLORS[color],
                showLine: true,
                pointStyle: false,
              })
            }

            //@ts-ignore
            graphData[index].data.push({x:parseFloat(x.replace(",",".")), y:parseFloat(chart.replace(",","."))})
          })
        })
        console.log(graphData)
        setData(graphData)
      }
      reader.readAsText(file)

    })

    // Do something with the files
  }, [])

  const downloadGraph = () => {
    let canvas = canvasRef.current;
    const img = canvas.toDataURL("image/png")
    var aDownloadLink = document.createElement('a');
    aDownloadLink.download = 'graphic.png';
    aDownloadLink.href = img;
    aDownloadLink.click();
  }

  useEffect(() => {
    console.log("Recreating chart")
    if (canvasRef.current) {
      if (chart != undefined) {
        chart.destroy()
        setChart(undefined)
      }
      let c = new Chart(canvasRef.current, {
        type: "scatter",
        data: {
          datasets: data
        },
        options: {
          scales: {
            x: {
              min: -1,
              max: 1,
              title: {
                text:"Temps [secondes]",
                display: true
              }
            },
            y: {
              title: {
                text:"Tensions [Volts]",
                display: true
              }
            }
          },
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true
                },
                mode: 'x',
              }
            },
            //@ts-ignore
            customCanvasBackgroundColor: {
              color: 'white',
            }
          }

        }
      })
      setChart(c);
    }

  }, [data])

  //@ts-ignore
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, noClick: true})


  return (
    <div {...getRootProps()}>

      <h1>How to use me ? Just drag and drop your csv file right on the graph !</h1>
      <button onClick={downloadGraph}>DOWNLOAD GRAPH</button>
      {/*@ts-ignore*/ }
      <input {...getInputProps()} />
      <canvas ref={canvasRef}/>
    </div>
  )
}