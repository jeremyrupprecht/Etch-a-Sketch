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
        // Disable the browers default dragging behavior
        div.ondragstart = () => {return false};
    }
    // Check for grid line toggle, as grid lines/div borders are a property of
    // divs, which are cleared in this function, as such the lines should be redrawn
    // if the toggle is set, if this isn't checked, clearing the grid would ALWAYS 
    // clear all gridlines
    toggleGridLines();
}

// Darken an RGB value by 10% by multiplying each value by 0.9
function darkenColorTenPercent(color) {
    const parts = color.match(/\d+/g);
    if (parts && parts.length === 3) {
        const r = Math.round(parts[0] * (0.9));
        const g = Math.round(parts[1] * (0.9));
        const b = Math.round(parts[2] * (0.9));
        return `rgb(${r}, ${g}, ${b})`;
    }
    // Return the original color if parsing fails
    return rgbColor; 
}

function changeColor(e) {    
    if (penMode === "black") {
        penColor = "black";
    } else if (penMode === "rainbow") {
        penColor ="#" + Math.floor(Math.random()*16777215).toString(16);
    } else if (penMode === "shader") {
        penColor = darkenColorTenPercent(`${getComputedStyle(this).backgroundColor}`);
    } else if (penMode === "erase") {
        penColor = "rgb(114, 111, 111)";
    }
    if (e.type === "click") {
        this.style.backgroundColor = penColor;
    }
    // Only draw if the move is down, to prevent 
    // dragging behavior
    if (!mouseDown) return;
    this.style.backgroundColor = penColor;
}

function toggleGridLines() {
    const allDivs = document.querySelectorAll(".gridDiv");
    if (gridLinesOn) {
        allDivs.forEach((div) => div.classList.add("WithGridLines"));
    } else {
        allDivs.forEach((div) => div.classList.remove("WithGridLines"));
    }
}

function switchDrawingMode(newMode) {
    // Remove the highlight effect on the previously selected/highlighted button
    switch(penMode) {
        case "black":
            drawButton.classList.remove("buttonActive");
            break;
        case "rainbow":
            rainbowButton.classList.remove("buttonActive");
            break;
        case "shader":
            shaderButton.classList.remove("buttonActive");
            break;
        case "erase":
            eraserButton.classList.remove("buttonActive");
            break;
    }
    // Add a highlight to the newly selected button
    switch(newMode) {
        case "black":
            drawButton.classList.add("buttonActive");
            break;
        case "rainbow":
            rainbowButton.classList.add("buttonActive");
            break;
        case "shader":
            shaderButton.classList.add("buttonActive");
            break;
        case "erase":
            eraserButton.classList.add("buttonActive");
            break;
    }
    penMode = newMode;
}

// Track mousemove events (see line 22) only when when the mouse is down,
// instead of directly tracking mousedown events which have issues with dragging 
let mouseDown = false;
document.addEventListener("mousedown", () => mouseDown = true);
document.addEventListener("mouseup", () => mouseDown = false);

let gridLinesOn = false;
const grid = document.getElementById("grid");
let numberOfRowsAndColumns = 32;
let divSize = GRID_DIMENSIONS_IN_PIXELS / numberOfRowsAndColumns;
createDivs(numberOfRowsAndColumns * numberOfRowsAndColumns);

let penMode = "black";
const drawButton = document.querySelector(".drawButton");
drawButton.addEventListener("click", () => switchDrawingMode("black"));

const rainbowButton = document.querySelector(".rainbowButton");
rainbowButton.addEventListener("click", () => switchDrawingMode("rainbow"));

const shaderButton = document.querySelector(".shaderButton");
shaderButton.addEventListener("click", () => switchDrawingMode("shader"));

const eraserButton = document.querySelector(".eraserButton");
eraserButton.addEventListener("click", () => switchDrawingMode("erase"));

const toggleGridLinesButton = document.querySelector(".toggleGridLinesButton");
toggleGridLinesButton.addEventListener("click", () => {
    gridLinesOn = !gridLinesOn;
    toggleGridLines();
    if (gridLinesOn) {
        toggleGridLinesButton.classList.add("buttonActive");
    } else {
        toggleGridLinesButton.classList.remove("buttonActive");
    }
});

const clearButton = document.querySelector(".clearButton");
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