import {ReactNode, useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {dropZone} from './styles/DropZone.css'

interface DropProps {
    onDrop: (files: File[]) => void;
    children: ReactNode
}

export default function DropZone(props: DropProps) {
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: props.onDrop,
        noClick: true,
        accept: {
            "text/csv": [".csv"]
        }
    })
    return (
        <>
            <div className={dropZone} {...getRootProps()}>
                <input {...getInputProps()} />
                {props.children}
            </div>
        </>
    )
}