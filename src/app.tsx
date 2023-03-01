import {useCallback, useEffect, useState} from 'react'
import MenuBar from "./components/MenuBar";
import NoCurrent from "./components/NoCurrent";
import DropZone from "./components/DropZone";
import {useGraphStore, useLocationStore} from "./stores/graphes";
import {parseCSV} from "./csv/parse";
import Graph from "./components/Graph";
import Disclaimer from "./components/Disclaimer";


function App() {
    const [graphs, add_graph] = useGraphStore(state => [state.graphs, state.add_graph]); //Retrieving csv
    const get_location = useLocationStore(state => state.get_spawn_location)
    const [disclaimerOpen, setDisclaimerOpen] = useState(window.localStorage.getItem("firstTime") == null);
    return (
    <>
        <MenuBar openHelp={() => {
            setDisclaimerOpen(true)
        }}/>
        <DropZone  onDrop={async (files) => {

            //@ts-ignore
            let data = await parseCSV(files[0])
            let location = get_location()
            add_graph(data, files[0].name,  location[0],  location[1])
      }}>
            {graphs.length == 0 ?
                (<NoCurrent/>)
                :
                graphs.map((g, i) => (<>
                    <Graph key={i} graph={g} />
                </>))

            }
            <p className={"brand"}>Website made with ❤ by Théo Daron</p>

        </DropZone>
        <Disclaimer open={disclaimerOpen} setOpen={setDisclaimerOpen} />

    </>
    )
}

export default App
