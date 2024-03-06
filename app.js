const canvas = document.querySelector('#canvas');
const colorPicker = document.querySelector('#color-picker');
const randomColor = document.querySelector('#random-color');
const changeSizeButton = document.querySelector('#change-size');
const eraseButton = document.querySelector('#erase');
const resetButton = document.querySelector('#reset');
const sizeDisplay = document.querySelectorAll('.canvas-size');
let color = '#000';
let canvasSize = 16;

function userInput() {
    let input = prompt('Enter a value between 16 and 100 for your preferred canvas dimensions: ');
    while (input < 16 || input > 100) {
        input = prompt('Invalid input. Please enter a value between 16 and 100.');
    }
    return parseInt(input);
}

function generateColor() {
    const R = Math.floor(Math.random() * 256);
    const G = Math.floor(Math.random() * 256);
    const B = Math.floor(Math.random() * 256);

    return `rgb(${R}, ${G}, ${B})`
}

function makeGrid(size) {
    canvas.style.gridTemplateColumns = `repeat(${canvasSize}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${canvasSize}, 1fr)`;

    for (let i = 0; i < size ** 2; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        canvas.appendChild(pixel);
        pixel.addEventListener('mouseover', () => {
            if (color === 'random') {
                pixel.style.backgroundColor = generateColor();
            }
            else if (color === 'erase') {
                pixel.style.backgroundColor = '#fff';
            } else {
                pixel.style.backgroundColor = color;
            }
        })
    }
}

function editDisplay(size) {
    for (let display of sizeDisplay) {
        display.innerText = `${size}`;
    }
}

window.addEventListener('load', function () {
    canvasSize = userInput();
    makeGrid(canvasSize);
    editDisplay(canvasSize);
})

changeSizeButton.addEventListener('click', () => {
    canvasSize = userInput();
    makeGrid(canvasSize);
    editDisplay(canvasSize);
})

colorPicker.addEventListener('change', () => {
    color = colorPicker.value;
})

randomColor.addEventListener('click', () => {
    color = 'random';
})

eraseButton.addEventListener('click', () => {
    color = 'erase';
})

resetButton.addEventListener('click', () => {
    colorPicker.value = '#000';
    canvasSize = 16;
    const pixels = document.querySelectorAll('.pixel');
    for (let pixel of pixels) {
        pixel.remove();
    }
    editDisplay(canvasSize);
})