function createDivs (numberOfDivs) {
    for (let i = 0; i < numberOfDivs; i++) {
        const div = document.createElement("div");
        div.classList.add("gridElement");

        // To disable the browers default dragging behavior
        div.ondragstart = () => {return false};

        grid.appendChild(div);
        div.addEventListener("mousemove", changeColor);
    }
}

function changeColor(e) {
    if (!mouseDown) return;
    this.style.backgroundColor = "black";

}

// Track mousemove events only when when the mouse is down, instead of tracking
// mousedown events which have issues with dragging 

let mouseDown = false;
document.addEventListener("mousedown", () => mouseDown = true);
document.addEventListener("mouseup", () => mouseDown = false);

const grid = document.getElementById("grid");
createDivs(256);

