import * as Dialog from '@radix-ui/react-dialog';
import {useEffect, useState} from "react";
import {Cross2Icon} from "@radix-ui/react-icons";
import "./styles/Dialog.css";
import * as Slider from "@radix-ui/react-slider";

interface DisclaimerProps {
    open: boolean,
    setOpen: (x: boolean) => void;
}

export default function Disclaimer(props: DisclaimerProps) {
    //const [open, setOpen] = useState(window.localStorage.getItem("firstTime") == null);
    const [part, setPart] = useState(0);
    useEffect(() => {
        setPart(0)
    }, [props.open])

    const close = () => {
        window.localStorage.setItem("firstTime", "false");
        props.setOpen(false)
    }
    return (
        <Dialog.Root onOpenChange={close} open={props.open}>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    {
                        part == 0 ? (
                            <>
                                <h1>Hey there !</h1>
                                <p>It looks like it's your first time on this website, glad to have you here !</p>
                                <p>There's a few things to know if you're going to use this website.</p>
                                <p>First things first, the format of files used here.</p>
                                <p>Please, use <b>Text (Tab delimited)</b>  file format. CSV works well too, but Pico 7 (maybe 6 too) have a bug using CSV on an european computer</p>
                                <p>Pico export CSV files with comma (<b>,</b>) as a separator...and for decimal points "," are used too ! So it just make unreadable file (or in a hard way)</p>
                                <p>It outputs things like that: <code>-3,55,4,20,0,8</code></p>
                                <p>Instead of: <code>-3.55,4.20,0.8</code></p>
                                <h4>To avoid that, use <b>Text (Tab delimited)</b>  format ! </h4>
                            </>
                        ) : (
                            <>
                                <h1>Website usage</h1>
                                <p>To use this website, that's really easy !</p>
                                <p>Just <b>Drag and Drop</b> your files right on the screen, or use the menu (and check the surprise button ) !</p>
                                <p>In graph settings you'll be able to change axes label, graph title</p>
                                <p>There is also a parameter called Precision, the lower it is, the lower is the number of point in your graph</p>
                                <p>That can help you remove noise from your graph !</p>
                                <p>(you can access this help again from the menubar)</p>
                                <h3>That said, have fun with your data, and enjoy !</h3>
                            </>
                        )

                    }

                    <button className={"Button "+(part==0?"green":"red")}  onClick={() => {
                        if (part == 0) {
                            setPart(part + 1)
                        } else {
                            close()
                        }
                    }}>{part == 0 ? "→ Website usage" : "Close"}</button>
                    <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                            <Cross2Icon />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );

}
