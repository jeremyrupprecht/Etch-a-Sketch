const GRID_DIMENSIONS_IN_PIXELS = 960;

function clearAllExistingDivs() {
    const allPreviousDivs = document.querySelectorAll(".gridDiv");
    allPreviousDivs.forEach((div) => {
        div.remove();
    });
}

function createDivs (numberOfDivs) {

    clearAllExistingDivs();

    for (let i = 0; i < numberOfDivs; i++) {
        const div = document.createElement("div");
        div.classList.add("gridDiv");
        // Each div is the size of the grid divided by the selected number of
        // grid rows/columns
        div.style.height = `${divSize}px`;
        div.style.width = `${divSize}px`;
        grid.appendChild(div);
        div.addEventListener("mousemove", changeColor);
        div.addEventListener("click", changeColor);
        // To disable the browers default dragging behavior
        div.ondragstart = () => {return false};
    }
}

function changeColor(e) {
    if (e.type === "click") {
        this.style.backgroundColor = penColor;
    }
    // Only draw if the move is down, to prevent 
    // dragging behavior
    if (!mouseDown) return;
    this.style.backgroundColor = penColor;
}

// Track mousemove events only when when the mouse is down, instead of tracking
// mousedown events which have issues with dragging 
let mouseDown = false;
document.addEventListener("mousedown", () => mouseDown = true);
document.addEventListener("mouseup", () => mouseDown = false);

const grid = document.getElementById("grid");
let numberOfRowsAndColumns = 32;
let divSize = GRID_DIMENSIONS_IN_PIXELS / numberOfRowsAndColumns;
createDivs(numberOfRowsAndColumns * numberOfRowsAndColumns);

let penColor = "black";
const drawButton = document.getElementById("drawButton");
drawButton.addEventListener("click", () => {
    penColor = "black";
})

// Rainbow

// Shader

const eraserButton = document.getElementById("eraserButton");
eraserButton.addEventListener("click", () => {
    penColor = "rgb(114, 111, 111)";
})

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", () => createDivs(numberOfRowsAndColumns * numberOfRowsAndColumns));

const gridSizeSlider = document.getElementById("myRange");
let displayGridSize = document.getElementById("displayGridSize");
displayGridSize.textContent = "40 x 40";

// Recalculate grid size every time the slider changes, but only do so
// once the user moves the slider AND releases the mouse button, to avoid 
// unecessary calculation while the user is moving the slider
let isSliderDragging = false;
gridSizeSlider.addEventListener("input", () => {
    isSliderDragging = true;
    displayGridSize.textContent = `${gridSizeSlider.value} x ${gridSizeSlider.value}`;
});

document.addEventListener("mouseup", () => {
    if (isSliderDragging) {
        numberOfRowsAndColumns = gridSizeSlider.value
        divSize = GRID_DIMENSIONS_IN_PIXELS / numberOfRowsAndColumns;
        createDivs(numberOfRowsAndColumns * numberOfRowsAndColumns);
    }
    isSliderDragging = false;
});