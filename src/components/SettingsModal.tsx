import * as Dialog from '@radix-ui/react-dialog';
import {useState} from "react";

export default function SettingsModal() {
    const [open, setOpen] = useState(true)
    return (

        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                        <p>Hello World !</p>
                        <button type="submit">Submit</button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>


    )
}