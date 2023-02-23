import {Scatter} from "react-chartjs-2";
import {GraphContainer, Toolbar, Button, Icon, DraggableStyle, zIndexVar} from "./styles/Graph.css";
import {
    Chart,
    ChartData,
    Filler,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Legend,
    ScatterController, Title
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import {CrossCircledIcon, ExitFullScreenIcon, GearIcon, EnterFullScreenIcon} from "@radix-ui/react-icons";
import Draggable from "react-draggable";
import {useCallback, useEffect, useRef, useState} from "react";
import {Resizable} from "re-resizable";
import {GraphWindow, useGraphStore} from "../stores/graphes";
import {assignInlineVars} from "@vanilla-extract/dynamic";
import SettingsModal from "./SettingsModal";

const plugin = {
    id: 'customCanvasBackgroundColor',
    //@ts-ignore
    beforeDraw: (chart, args, options) => {
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || '#ffffff';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    }
};


Chart.register(LinearScale, Filler, ScatterController, PointElement, LineController, zoomPlugin, LineElement, Legend, plugin, Title)

interface GraphProps {
    graph: GraphWindow;
}


export default function Graph(props: GraphProps) {
    const chartRef = useRef(null);
    const [destroyed, setDestroyed] = useState(false)
    const [, updateState] = useState();
    //@ts-ignore
    const forceUpdate = useCallback(() => updateState({}), []);
    const [fullscreen, setFullscreen] = useState(false)
    const [graphs, update_graph] = useGraphStore(state => [state.graphs, state.update_graph])
    const downloadGraph = () => {
        if (chartRef.current == undefined) {
            return
        }
        //@ts-ignore
        let canvas: HTMLCanvasElement = chartRef.current.canvas;
        const img = canvas.toDataURL("image/png")
        var aDownloadLink = document.createElement('a');
        aDownloadLink.download = 'graphic.png';
        aDownloadLink.href = img;
        aDownloadLink.click();
    }

    const zIndexUpdate = () => {
        let maxZIndex = Math.max(...graphs.map(x => x.zIndex))
        if (props.graph.zIndex == maxZIndex && graphs.filter(x => x.zIndex == maxZIndex).length < 2) {
            return
        }
        props.graph.zIndex = maxZIndex + 1
        update_graph(props.graph)
        console.log("Updating z-index !")
        forceUpdate()
    }

    const deleteMyself = () => {
        setDestroyed(true)
    }


    return !destroyed ? (
        //<div style={assignInlineVars({[zIndexVar]: props.graph.zIndex.toString()} )}>
            <Draggable defaultPosition={{
                x: props.graph.droppedX,
                y: props.graph.droppedY
            }} onStart={zIndexUpdate} defaultClassName={DraggableStyle[fullscreen ? "fullscreen" : "floating"]} handle={"." + Toolbar}>
                <Resizable defaultSize={{
                    width: "40vw",
                    height: "25vh"
                }} >
                    <div className={GraphContainer[fullscreen ? "fullscreen" : "floating"]} >
                        <div className={Toolbar}>
                            <div>
                                <GearIcon className={Icon}/>
                                {fullscreen
                                    ?
                                    <ExitFullScreenIcon onClick={() => {setFullscreen(false)}} className={Icon}/>
                                    :
                                    <EnterFullScreenIcon onClick={() => {setFullscreen(true)}} className={Icon}/>
                                }
                                <CrossCircledIcon className={Icon} onClick={deleteMyself}/>

                            </div>

                            <button className={Button} onClick={downloadGraph}>Download picture</button>
                        </div>
                        <Scatter ref={chartRef} data={props.graph.data} options={{
                            plugins: {
                                zoom: {
                                    zoom: {
                                        wheel: {
                                            enabled: true
                                        },
                                        mode: "x"
                                    },
                                    pan: {
                                        enabled: true
                                    }
                                },
                                title: {
                                    display: true,
                                    text: props.graph.fileName
                                }
                            },

                        }}/>
                    </div>
                </Resizable>

            </Draggable>
        //</div>

    ) : (<></>)
}