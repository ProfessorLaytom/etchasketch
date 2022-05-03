const drawingBoard = document.querySelector('.drawing-board');
let mouseDown = false

function makeGrid(gridSize){
    let width = Math.round(620/gridSize*100)/100;
    let height = Math.round(620/gridSize*100)/100;
    for (let i = 0; i < gridSize; i++){
        for (let j = 0; j< gridSize; j++){
            const singleSquare = document.createElement('div');
            singleSquare.classList.add('square');
            singleSquare.setAttribute('style', `width : ${width}px; height :${height}px;`);
            drawingBoard.appendChild(singleSquare)
        }
    }
}

makeGrid(30);

function draw(e) {
    const black = document.querySelector('.black>input')
    if (black.checked) {
        e.target.style.backgroundColor = 'black';
    }
}

function logTest(e) {
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

const squares = Array.from(document.querySelectorAll('.square'));
squares.forEach(square => square.addEventListener('mousedown', logTest))
squares.forEach(square => square.addEventListener('mouseover', mouseMovedAndDown))
squares.forEach(square => square.addEventListener('mouseup', mouseUp))