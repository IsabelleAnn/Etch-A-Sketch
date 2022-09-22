(function() {
    const container = document.querySelector('#box-container');
    const containerSideLength = 600;
    container.style.height = `${containerSideLength}px`;
    container.style.width = `${containerSideLength}px`;
    let pixels = [...document.getElementsByClassName('pixel')];
    let gridSizeRange = document.querySelector('#grid-size');
    let gridSizeText = document.querySelector('#grid-size-text');
    let gridSizeRangeValue = gridSizeRange.value;
    const colorPickerBtn = document.getElementById('color');
    const colorBtn = document.getElementById('color-btn')
    const eraserBtn = document.getElementById('eraser-btn');
    const randomColorBtn = document.getElementById('random-color-btn');
    const lightColorBtn = document.getElementById('lighten-btn');
    const darkenColorBtn = document.getElementById('darken-btn');
    let defaultColor = 'black';
    let currentColor = defaultColor;
    let random = false;
    let lighten = false;
    let darken = false;
    let buttons = document.querySelectorAll('.btn');

    generateDrawingBoard(gridSizeRangeValue);

    handlePixelRender();

    gridSizeRange.addEventListener('change', handleBoardSize);

    colorPickerBtn.addEventListener('change', () => {
        random = false;
        darken = false;
        lighten = false;
        currentColor = document.getElementById('color').value;
    });

    buttons.forEach(button => {
        button.addEventListener('click', changeColorOnClick);
    });

    function changeColorOnClick(e) {
        console.log(e.target.id);
        switch (e.target.id) {
            case lightColorBtn.id:
                lighten = true;
                random = false;
                darken = false;
                break;
            case darkenColorBtn.id:
                darken = true;
                random = false;
                lighten = false;
                break;
            case colorBtn.id:
                random = false;
                darken = false;
                lighten = false;
                currentColor = document.getElementById('color').value;
                break;
            case randomColorBtn.id:
                random = true;
                darken = false;
                lighten = false;
                break;
            case eraserBtn.id:
                random = false;
                darken = false;
                lighten = false;
                currentColor = 'white';
                break;
        }
    }

    function handleBoardSize() {
        random = false;
        darken = false;
        lighten = false;
        gridSizeRangeValue = gridSizeRange.value;
        gridSizeText.textContent = `${gridSizeRangeValue} X ${gridSizeRangeValue}`;
        currentColor = defaultColor;
        removeChildren(container);
        generateDrawingBoard(gridSizeRangeValue);
        createPixelListener();
    }

    function handlePixelRender() {
        pixels = [...document.getElementsByClassName('pixel')];
        pixels.forEach(function(pixel) {
            pixel.addEventListener('mouseenter', () => {
                pixel.style.filter = `brightness(100%)`;
                if (random) {
                    pixel.style.backgroundColor = getRandomRGBColor();
                } else if (darken) {
                    pixel.style.filter = `brightness(70%)`;
                } else if (lighten) {
                    pixel.style.filter = `brightness(130%)`;
                } else {
                    pixel.style.backgroundColor = currentColor;
                }
            });
        });
    }

    function generateDrawingBoard(pixelsPerSide) {
        colorPickerBtn.value = '#000000';
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

    function removeChildren(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.lastChild);
        }
    }

    function getRandomRGBColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

})();