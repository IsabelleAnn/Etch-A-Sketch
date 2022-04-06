const container = document.querySelector('#box-container');
const containerSideLength = 600;
container.style.height = `${containerSideLength}px`;
container.style.width = `${containerSideLength}px`;

let pixelsPerSide = parseInt(prompt('Please enter amount of pixels per side. Max = 100'));
const maximumPixels = 100;

while (!checkIfBelowMax(pixelsPerSide, maximumPixels)) {
    pixelsPerSide = parseInt(prompt('Too many pixels. Please renter amount of pixels per side. Max = 100'));
}

function checkIfBelowMax(num, max) {
    if (num <= max) {
        return true;
    } else return false;
}

let pixelLength = containerSideLength / pixelsPerSide;

function generateDrawingBoard() {
    for (let i = 0; i < pixelsPerSide; i++) {
        const subContainer = document.createElement('div');
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

generateDrawingBoard();