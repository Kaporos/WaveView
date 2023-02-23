import * as Dialog from '@radix-ui/react-dialog';
import "./styles/Dialog.css"
import {Cross2Icon} from "@radix-ui/react-icons";
import {GraphWindow, useGraphStore} from "../stores/graphes";
import {useForm} from "react-hook-form";
import * as Slider from '@radix-ui/react-slider';
interface SettingsProps {
    isOpen: boolean,
    setOpen: (state: boolean) => void;
    graph: GraphWindow
}

type SettingsData = {
    title: string,
    yAxis: string,
    xAxis: string
    precision: number
}

export default function SettingsModal(props: SettingsProps) {
    const {register, setValue, handleSubmit, formState: {errors}} = useForm<SettingsData>();
    const update_graph = useGraphStore(state => state.update_graph)
    const onSubmit = handleSubmit((data) => {
        props.graph.title = data.title;
        props.graph.xLabel = data.xAxis;
        props.graph.yLabel = data.yAxis;
        props.graph.precision = data.precision;
        update_graph(props.graph)
        props.setOpen(false);
    });
    return (

        <Dialog.Root onOpenChange={props.setOpen} open={props.isOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">Graph settings</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Make changes to your graph config here. Click save when you're done.
                    </Dialog.Description>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="name">
                            Graph Title
                        </label>
                        <input className="Input" id="name" defaultValue={props.graph.title} {...register("title")} />
                    </fieldset>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="xAxis">
                            X Label
                        </label>
                        <input className="Input" id="xAxis" defaultValue="" placeholder={"Nothing by default"} {...register("xAxis")} />
                    </fieldset>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="yAxis">
                            Y Label
                        </label>
                        <input className="Input" id="yAxis" placeholder={"Nothing by default"} {...register("yAxis")} />
                    </fieldset>
                    <fieldset className="Fieldset">
                        <label className="Label" htmlFor="precision">
                            Précision
                        </label>
                        <Slider.Root onValueChange={(val: number[]) => {
                            setValue("precision", 15 - val[0] + 1)
                        }} className="SliderRoot" defaultValue={[15 - props.graph.precision]} max={15} step={1} aria-label="Precision">
                            <Slider.Track className="SliderTrack">
                                <Slider.Range className="SliderRange" />
                            </Slider.Track>
                            <Slider.Thumb className="SliderThumb" />
                        </Slider.Root>

                    </fieldset>
                    <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                            <button className="Button green" onClick={onSubmit}>Save changes</button>
                    </div>
                    <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>



    )
}