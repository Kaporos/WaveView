import {createVar, style, styleVariants} from "@vanilla-extract/css";
export const zIndexVar = createVar();

export const DraggableStyle = styleVariants({
    floating: {
        zIndex: zIndexVar
    },
    fullscreen: {
        transform: "none !important",
        //@ts-ignore (for !important)
        position: "absolute !important",
        top: 0,
        left: 0,
        backgroundColor: "white",
        height: "100vh",
        zIndex: 9999
    }
})

export const GraphContainer = styleVariants({
    floating: {
        position: "relative",
        margin: "5px",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 2px 10px var(--blackA7)",
        backgroundColor: "white",
        paddingBottom: "10px",
        paddingRight: "10px",
    },
    fullscreen: {
        width: "100vw",
        height: "80vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 9999,
        backgroundColor: "white",
        display: "grid",
        placeItems: "center",
    }

})

export const Toolbar = style({
    display:"flex",
    justifyContent: "space-between",
    padding: "15px"

})

export const Button = style({
    backgroundColor: "#2ecc71",
    padding: "2px 12px",
    color: "black",
    borderRadius: "2px",
    fontSize: "12px",
    ":hover": {
        backgroundColor: "#27ae60",
        cursor: "pointer"
    },
    resize: "both"
})

export const Icon = style({
    border: "1px solid rgba(0,0,0,0.2)",
    padding: "5px",
    borderRadius: "3px",
    ":hover": {
        backgroundColor: "rgba(0,0,0,0.08)",
        cursor: "pointer"
    },
    marginRight: "5px"
})