import { style } from "@vanilla-extract/css";

export const noCurrent = style({
    flex: 1,
    display: "grid",
    placeItems: "center",
    height: "100%"
})

export const noCurrentTitle = style({
    color: "rgba(0,0,0,.5)"
})

export const dropDashedBox = style({
    display: "grid",
    placeItems: "center",
    height: "30vh",
    width: "30vw",
    textAlign: "center",
    border: "5px dashed rgba(0,0,0,0.5)",

})
/*
.noCurrent {
    flex: 1;
    display: grid;
    place-items: center;
}

.noCurrent h1,h2 {
    color: rgba(0,0,0,.5)
}

.dropZone {
    display: grid;
    place-items: center;
    height: 30vh;
    width: 30vw;
    text-align: center;
    border: 5px dashed rgba(0,0,0,.5);
}
*/