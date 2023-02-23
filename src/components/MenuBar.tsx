import * as Menubar from '@radix-ui/react-menubar';
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from '@radix-ui/react-icons';
import './styles/MenuBar.css';
import {useGraphStore, useLocationStore} from "../stores/graphes";
import {parseCSV} from "../csv/parse";
const MenubarDemo = () => {
    const add_graph = useGraphStore(state => state.add_graph)
    const get_location = useLocationStore(state => state.get_spawn_location)

    const pickFile = () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = "text/csv"
        input.click();
        input.onchange = async e => {
            //@ts-ignore
            var file: File = e.target.files[0];
            let data = await parseCSV(file)
            let loc = get_location()
            add_graph(data, file.name, loc[0], loc[1])
        }
    }

    return (
        <Menubar.Root className="MenubarRoot">
            <Menubar.Menu>
                <Menubar.Trigger className="MenubarTrigger">File</Menubar.Trigger>
                <Menubar.Portal>
                    <Menubar.Content className="MenubarContent" align="start" sideOffset={5} alignOffset={-3}>
                            <Menubar.Item onClick={pickFile} className="MenubarSubTrigger">
                                Open CSV file

                            </Menubar.Item>

                    </Menubar.Content>
                </Menubar.Portal>
            </Menubar.Menu>

        </Menubar.Root>
    );
};

export default MenubarDemo;
