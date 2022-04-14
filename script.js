const container = document.querySelector('#box-container');
const containerSideLength = 600;
container.style.height = `${containerSideLength}px`;
container.style.width = `${containerSideLength}px`;
let defaultColor = 'black';
let currentColor = defaultColor;
const gridSizeRange = document.querySelector('#grid-size');
let gridSizeText = document.querySelector('#grid-size-text');
let gridSizeRangeValue = gridSizeRange.value;

//Initial drawing board creation: ---------------------------------------------------------------------------
generateDrawingBoard(gridSizeRangeValue);
let pixels = [...document.getElementsByClassName('pixel')];
pixels.forEach(function(pixel) {
    pixel.addEventListener('mouseenter', () => {
        if (random) {
            pixel.style.filter = `brightness(100%)`;
            pixel.style.backgroundColor = getRandomRGBColor();;
        } else if (darken) {
            pixel.style.filter = `brightness(70%)`;
        } else if (lighten) {
            pixel.style.filter = `brightness(130%)`;
        } else {
            pixel.style.filter = `brightness(100%)`;
            pixel.style.backgroundColor = currentColor;
        }
    });
});

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

//----------Resizes Drawing Board-------------------------------------------
gridSizeRange.addEventListener('change', () => {
    gridSizeRangeValue = gridSizeRange.value;
    gridSizeText.textContent = `${gridSizeRangeValue} X ${gridSizeRangeValue}`;
    currentColor = defaultColor;
    colorPickerBtn.value = '#000000';
    removeChildren(container);
    generateDrawingBoard(gridSizeRangeValue);
    pixels = [...document.getElementsByClassName('pixel')];
    pixels.forEach(function(pixel) {
        pixel.addEventListener('mouseenter', () => {
            if (random) {
                pixel.style.filter = `brightness(100%)`;
                pixel.style.backgroundColor = getRandomRGBColor();;
            } else if (darken) {
                pixel.style.filter = `brightness(70%)`;
            } else if (lighten) {
                pixel.style.filter = `brightness(130%)`;
            } else {
                pixel.style.filter = `brightness(100%)`;
                pixel.style.backgroundColor = currentColor;
            }
        });
    });
});

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

//COLOR CONTROLS:-------------------------------------------------------------------
//Color Picker Button:
const colorPickerBtn = document.getElementById('color');
colorPickerBtn.addEventListener('change', () => {
    random = false;
    darken = false;
    lighten = false;
    currentColor = document.getElementById('color').value;;
});

//Eraser Button:
const eraserBtn = document.getElementById('eraser-btn');
eraserBtn.addEventListener('click', () => {
    random = false;
    darken = false;
    lighten = false;
    currentColor = 'white';
});

//Random Color Button:
const randomColorBtn = document.getElementById('random-color-btn');
let random = false;
randomColorBtn.addEventListener('click', () => {
    darken = false;
    lighten = false;
    random = true;
});

function getRandomRGBColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

//Lighten Color Button:
const lightColorBtn = document.getElementById('lighten-btn');
let lighten = false;
lightColorBtn.addEventListener('click', () => {
    random = false;
    darken = false;
    lighten = true;
});

//Darken Color Button:
const darkenColorBtn = document.getElementById('darken-btn');
let darken = false;
darkenColorBtn.addEventListener('click', () => {
    random = false;
    lighten = false;
    darken = true;
});