import {create} from "zustand";
import {ChartData} from "chart.js";


export class GraphWindow {
    data: ChartData<"scatter">;
    index: number
    zIndex: number
    fileName: string
    droppedX: number
    droppedY: number
    constructor(data: ChartData<"scatter">, index: number, fileName: string, dx: number, dy: number) {
        this.data = data;
        this.zIndex = 1;
        this.index = index
        this.fileName = fileName
        this.droppedX = dx
        this.droppedY = dy
    }
}

interface GraphsState {
    graphs: GraphWindow[],
    add_graph: (graph: ChartData<"scatter">, name: string, x:number, y:number) => void,
    update_graph: (graph: GraphWindow) => void,
}

interface SpawnState {
    spawn_location: [number, number]
    get_spawn_location: () => [number, number];
}


export const useLocationStore = create<SpawnState>((set, get) => ({
    spawn_location: [0,0],
    get_spawn_location: () => {
        let location = get().spawn_location;
        set((state) => {
            return {
                spawn_location: [location[0]+50, location[1]+50]
            }
        })
        return location
    }
}))

export const useGraphStore = create<GraphsState>(set => ({
    graphs: [],
    add_graph: (graph, name: string, x:number, y:number) => {
        set((state) => {
            let window = new GraphWindow(graph, state.graphs.length, name, x, y);
            state.graphs.push(window)
            return {
                graphs: state.graphs
            }
        })
    },
    update_graph(graph: GraphWindow) {
        set((state) => {
            state.graphs[graph.index] = graph
            return state
        })
    },
}))