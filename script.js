const GRID_DIMENSIONS_IN_PIXELS = 960;

function clearAllExistingDivs() {
    const allPreviousDivs = document.querySelectorAll(".gridElement");
    allPreviousDivs.forEach((div) => {
        div.remove();
    });
}

function createDivs (numberOfDivs) {

    clearAllExistingDivs();

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

// Create a grid
const grid = document.getElementById("grid");
let numberOfRowsAndColumns = 32;
let divSize = GRID_DIMENSIONS_IN_PIXELS / numberOfRowsAndColumns;
createDivs(numberOfRowsAndColumns * numberOfRowsAndColumns);

// Create a slider to adjust grid size, every time the slider value changes, 
// recalculate the grid to the specified size
let gridSizeSlider = document.getElementById("myRange");
let displayGridSize = document.getElementById("displayGridSize");
displayGridSize.textContent = "32 x 32";

gridSizeSlider.oninput = function() {
    displayGridSize.textContent = `${this.value} x ${this.value}`;
    numberOfRowsAndColumns = this.value
    divSize = GRID_DIMENSIONS_IN_PIXELS / numberOfRowsAndColumns;
    createDivs(numberOfRowsAndColumns * numberOfRowsAndColumns);
}

