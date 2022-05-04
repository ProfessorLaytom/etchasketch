const drawingBoard = document.querySelector('.drawing-board');
let mouseDown = false; //for tracking the mouse when clicked continuously


let drawingBoardSize = '580px'
drawingBoard.style.width = drawingBoardSize;
drawingBoard.style.height = drawingBoardSize;
//for the drawing color
const choicesArray = Array.from(document.querySelectorAll('input'));
let [black, rainbow, eraser, darken, lighten] = choicesArray


function makeGrid(gridSize){
    //makes the grid
    let width = Math.round(parseInt(drawingBoardSize)/gridSize*100)/100;
    let height = Math.round(parseInt(drawingBoardSize)/gridSize*100)/100;
    for (let i = 0; i < gridSize; i++){
        for (let j = 0; j< gridSize; j++){
            const singleSquare = document.createElement('div');
            singleSquare.classList.add('square');
            singleSquare.setAttribute('style', `width : ${width}px; height :${height}px; background-color: rgb(255,255,255)`); //setting the width, height and color
            drawingBoard.appendChild(singleSquare)
        }
    }
}

makeGrid(30);

function unCheckRest(e) {
    //uncheck all other parameters for drawing
    let toTest = e.target.parentElement.classList[1]
    choicesArray.forEach(choice => (choice.parentElement.classList[1] !== toTest) ? choice.checked = false : 0)
}

function randomRGB(){
    //generates random numbers between 0 and 255, returns a
    //rgb string
    let randomR = Math.floor(Math.random()*256);
    let randomG = Math.floor(Math.random()*256);
    let randomB = Math.floor(Math.random()*256);
    return `rgb(${randomR}, ${randomG}, ${randomB})`
}

function stringToRGBArray(rgb){
    //converts the string to an array of 3 rgb values
    rgb = rgb.substring(4, rgb.length-1)
    rgb = rgb.replace(/ /g, '')
    rgb = rgb.split(',');
    return rgb.map(color => parseInt(color))
}

function draw(e) {
    //looks how to draw and modifies the background color for drawing
    if (black.checked) {
        e.target.style.backgroundColor = 'rgb(0,0,0)';
    }else if (rainbow.checked){
        e.target.style.backgroundColor = randomRGB();
    }else if (eraser.checked){
        e.target.style.backgroundColor = 'rgb(255, 255, 255)';
    } else if (lighten.checked){
        let rgb = stringToRGBArray(e.target.style.backgroundColor)
        rgb = rgb.map(color => Math.min(color + 20 , 255))
        e.target.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    } else if (darken.checked){
        let rgb = stringToRGBArray(e.target.style.backgroundColor)
        rgb = rgb.map(color => Math.max(color - 20 , 0))
        e.target.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    }
}

function mouseIsDown(e) {
    mouseDown = true;
    draw(e)
}

function mouseMovedAndDown(e){
    if (mouseDown){
        draw(e)
    }
}

function mouseUp(e) {
    mouseDown = false;
}

function resetBoard(e){
    //resets the board
    squares.forEach(square => square.style.backgroundColor = 'rgb(255, 255, 255)')
}

const squares = Array.from(document.querySelectorAll('.square'));
squares.forEach(square => square.addEventListener('mousedown', mouseIsDown))
squares.forEach(square => square.addEventListener('mouseover', mouseMovedAndDown))
squares.forEach(square => square.addEventListener('mouseup', mouseUp))

const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', resetBoard)

choicesArray.forEach(choice => choice.addEventListener('click', unCheckRest))