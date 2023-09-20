function createDivs (numberOfDivs) {
    divs = [];
    for (let i = 0; i < numberOfDivs; i++) {
        const div = document.createElement("div");
        div.classList.add("gridElement");
        grid.appendChild(div);

        divs.push(div);
    }

    return divs
}

const grid = document.getElementById("grid");
const divList = createDivs(256);
console.log(grid);