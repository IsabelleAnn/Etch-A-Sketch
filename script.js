const container = document.querySelector('#box-container');
const containerSideLength = 600;
container.style.height = `${containerSideLength}px`;
container.style.width = `${containerSideLength}px`;

//Initial drawing board: ---------------------------------------------------------------------------
generateDrawingBoard(16);
colorBoardEvent();

function generateDrawingBoard(pixelsPerSide) {
    let pixelLength = containerSideLength / pixelsPerSide;
    for (let i = 0; i < pixelsPerSide; i++) {
        const subContainer = document.createElement('div');
        subContainer.classList.add('subContainer');
        container.appendChild(subContainer);
        subContainer.style.display = 'flex';
        for (let j = 0; j < pixelsPerSide; j++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.style.height = `${pixelLength}px`;
            pixel.style.width = `${pixelLength}px`;
            subContainer.appendChild(pixel);
            pixel.style.display = 'inline-block';
        }
    }
}


//User resets drawing board: --------------------------------------------------------------------
const resetBtn = document.querySelector('#reset-btn');
resetBtn.addEventListener('click', () => {
    removeChildren(container);
    generateDrawingBoard(getNumInputBelowMax());
    colorBoardEvent();
});

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

function getNumInputBelowMax() {
    let numInput = parseInt(prompt('Please enter amount of pixels per side. Max = 100'));
    const maxInput = 100;
    while (!checkIfBelowMax(numInput, maxInput)) {
        numInput = parseInt(prompt('Too many pixels. Please renter amount of pixels per side. Max = 100'));
    }
    return numInput;
}

function checkIfBelowMax(num, max) {
    if (num <= max) {
        return true;
    } else return false;
}

//Coloring Board Options: ------------------------------------------------------------------------------------------
function colorBoardEvent() {
    const pixels = [...document.getElementsByClassName('pixel')];
    console.log(pixels);

    pixels.forEach(function(pixel) {
        pixel.addEventListener('mouseenter', function(event) {
            console.log(event.target);
            pixel.style.backgroundColor = 'black';
        });
    });
}

//color picker - default black

//random color Red: #fe5b63 Pink: #ff7cbb Yellow: #ffdb7c Green: #5bf495 Blue: #80b4ff Purple: #a580ff Gray: #5e5858

//lighten

//darken