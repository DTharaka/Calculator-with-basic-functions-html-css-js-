let runningTotal = 0;
let buffer = "0"; //track of user input 
let previousOperator = null;; //track what the operator user pressed previously
const screen = document.querySelector(".screen");

document.querySelector('.calc-buttons').addEventListener("click",function(event) {
    buttonClick(event.target.innerText);
})

//check whether the cliked one is number or symbol
function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value; //once click a button buffer equal to that buttons value
    } else {
        buffer = buffer + value;
    }
    
}

function handleSymbol(value) {
    switch (value) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = 0;
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
   previousOperator = value;
   
   buffer = "0";
}

function flushOperation (intBuffer) {
    if (previousOperator === "+") {
        runningTotal = runningTotal + intBuffer;
    } else if (previousOperator === "-") {
        runningTotal = runningTotal - intBuffer;
    } else if (previousOperator === "×") {
        runningTotal = runningTotal * intBuffer;
    } else {
        runningTotal = runningTotal / intBuffer;
    }
}


function rerender() {
    screen.innerText = buffer;
}