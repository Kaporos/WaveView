import {useCallback, useEffect, useState} from 'react'
import MenuBar from "./components/MenuBar";
import NoCurrent from "./components/NoCurrent";
import DropZone from "./components/DropZone";
import {useGraphStore} from "./stores/graphes";
import {parseCSV} from "./csv/parse";
import Graph from "./components/Graph";

function App() {
    const [graphs, add_graph] = useGraphStore(state => [state.graphs, state.add_graph]); //Retrieving csv
    const [, updateState] = useState();
    return (
    <>
        <MenuBar/>
        <DropZone  onDrop={async (files) => {

            //@ts-ignore
            let data = await parseCSV(files[0])
            add_graph(data)
      }}>
            {graphs.length == 0 ?
                (<NoCurrent/>)
                :
                graphs.map((g, i) => (<>
                    <Graph key={i} graph={g} />
                </>))
            }
      </DropZone>

    </>
    )
}

export default App
