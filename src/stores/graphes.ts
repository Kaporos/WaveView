import {create} from "zustand";
import {ChartData} from "chart.js";


export class GraphWindow {
    data: ChartData<"scatter">;
    index: number
    zIndex: number
    constructor(data: ChartData<"scatter">, index: number) {
        this.data = data;
        this.zIndex = 1;
        this.index = index
    }
}

interface GraphsState {
    graphs: GraphWindow[],
    add_graph: (graph: ChartData<"scatter">) => void,
    update_graph: (graph: GraphWindow) => void,
}

export const useGraphStore = create<GraphsState>(set => ({
    graphs: [],
    add_graph: (graph) => {
        set((state) => {
            let window = new GraphWindow(graph, state.graphs.length);
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