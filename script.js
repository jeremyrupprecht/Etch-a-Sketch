const GRID_DIMENSIONS_IN_PIXELS = 960;

function createDivs (numberOfDivs) {

    for (let i = 0; i < numberOfDivs; i++) {
        const div = document.createElement("div");
        div.classList.add("gridElement");
        // Each div is the size of the grid divided by the selected number of
        // grid rows/columns
        div.style.height = `${divSize}px`;
        div.style.width = `${divSize}px`;
        grid.appendChild(div);
        div.addEventListener("mousemove", changeColor);
        // To disable the browers default dragging behavior
        div.ondragstart = () => {return false};
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

// Multiples of 16 to 100(ish) --> 16, 32, 48, 64, 80, 86, 112
let numberOfRowsAndColumns = +prompt("Enter a grid size:");
let divSize = GRID_DIMENSIONS_IN_PIXELS / numberOfRowsAndColumns;

const grid = document.getElementById("grid");
createDivs(numberOfRowsAndColumns * numberOfRowsAndColumns);
