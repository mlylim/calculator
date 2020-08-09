
// NUMBER INPUT ON CLICK
const buttons = Array.from(document.querySelectorAll('button'));
buttons.forEach(button => button.addEventListener("click", function () { buttonPressed(button.id) }));

// ADD KEYBOARD LISTENING COMPONENT 
document.addEventListener('keydown', (element) => {
    key = element.keyCode
    if ((key === 48) || (key === 96)) {
        buttonPressed('0')
    }
    else if (key === 49) {
        buttonPressed('1')
    }
    else if (key === 50) {
        buttonPressed('2')
    }
    else if (key === 51) {
        buttonPressed('3')
    }
    else if (key === 52) {
        buttonPressed('4')
    }
    else if (key === 53) {
        buttonPressed('5')
    }
    else if (key === 54) {
        buttonPressed('6')
    }
    else if (key === 55) {
        buttonPressed('7')
    }
    else if (event.getModifierState("Shift") && (event.key == '*')) {
        buttonPressed('✕')
    }
    else if (key === 56) {
        buttonPressed('8')
    }
    else if (key === 57) {
        buttonPressed('9')
    }
    else if (key === 67) {
        buttonPressed('C')
    }
    else if (key === 189) {
        buttonPressed('−')
    }
    else if (key === 191) {
        buttonPressed('÷')
    }
    else if (key === 190) {
        buttonPressed('.')
    }
    else if ((key === 46) || (key === 8)) {
        buttonPressed('DEL')
    }
    else if (event.getModifierState("Shift") && (event.key == '+')) {
        buttonPressed('+')
    }
    else if (key == 13) {
        buttonPressed('=')
    }
    else if (key === 187) {
        buttonPressed('=')
    }
    
});

let i = 0; // INDEX FOR RAW INPUT
let m = 0; // INDEX FOR JOINED NUMBERS
let h = 0; // INDEX TO SPLICE NUMBERS
let decim = 0; // COUNTER FOR NUMBER OF DECIMALS INPUTTED 
let op = 0; // COUNTER FOR OPERATIONS INPUTTED 
let decimTemp = 0;
let opTemp = 0;
let solution = 0; // INTERMEDIATE SOLUTION
let count = 0; // NUMBER OF TIMES PROGRAM HAS BEEN RUN
let longNum = []; // INDIVIDUAL INPUTTED STRINGS
let holder = 0;
let temp = []; // JOINED NUMBERS
let nonNumString = '+ − ✕ ÷ =';
let nonNumNoAddSubtract = "✕ ÷ =";
let nonNumNoEquals = '+ − ✕ ÷ '

function buttonPressed(numPressed) {

    longNum[i] = numPressed;
    longNum = longNum.filter(Boolean) //removes undefined in array after cleaning
    i += 1;

    if (numPressed == 'C') //clear array
    {
        clear();
    }
    if ((count > 0) && (numPressed != 'C'))//use previous value for next calculation
    {
        clear()
        decim = decimTemp;
        op = opTemp + 1;
        longNum[0] = holder;
        longNum[1] = numPressed;
        i = 2;
    }
    if (nonNumNoEquals.includes(numPressed) && (i !== 1)) //decimal tracking pt 1
    {
        op = op + 1;
        opTemp = op
    }

    if ('.' === numPressed) //multiple decimals in 1 number?
    {
        decim = decim + 1;
        decimTemp = decim

        if (decim > (op + 1)) {
            longNum.splice(-1, 1)
            decim = decim - 1;
        }
    }

    if (nonNumNoAddSubtract.includes(longNum[0])) //remove mult/divis/eq signs if inputted first
    {
        longNum.splice(0, 1)
    }

    if (numPressed == 'DEL') {
        longNum.splice(-2, 2)
    }

    if (i > 0) //removes repetitive operators
    {
        if (nonNumString.includes(longNum[i - 1]) && nonNumString.includes(longNum[i - 2])) {
            longNum.splice(-2, 1)
            i = i - 1
            longNum = longNum.filter(Boolean)
        }
        else if ('.' === (longNum[i - 1]) && '.' === longNum[i - 2]) {
            longNum.splice(-2, 1)
            i = i - 1
            longNum = longNum.filter(Boolean)
        }
    }

    // propagate input box
    let box = document.getElementById('inputBox');
    box.innerHTML = '<p1>' + longNum.join('') + '</p1>';
    box.style.font = "48px arial, serif"


    if (numPressed == '=') //reached end of the equation
    {
        count = count + 1;
        for (var j = 0; j < longNum.length; j++) {
            if (nonNumString.includes(longNum[j])) { //put individual numbers together
                if (temp.length < 1) {
                    h = 0;
                    temp[m] = Number(longNum.slice(h, j).join(''))
                    w = j + 1;
                }
                else {
                    temp[m] = Number(longNum.slice(w, j).join(''))
                    w = j + 1;
                }
                temp[m + 1] = longNum[j]
                m = m + 2
            }
        }
        for (var z = 0; z < temp.length; z++) //display solution
        {
            if (nonNumNoEquals.includes(temp[z])) {
                solution = (operate(temp[z], temp[z - 1], temp[z + 1]))
                temp[z + 1] = solution;
                holder = solution;
                box.innerHTML = '<p1>' + longNum.join('') + solution + '</p1>'

            }
        }

    }
}

function clear() // reset variables to 0
{
    longNum.length = 0;
    temp.length = 0;
    i = 0; h = 0;
    solution = 0;
    count = 0;
    decim = 0;
    op = 0;
}
// MATH FUNCTIONS BELOW
function operate(operator, a, b) {
    let answer = 0;
    if (operator == "+") {
        answer = (add(a, b));
    }
    else if (operator == "−") {
        answer = subtract(a, b);
    }
    else if (operator == "✕") {
        answer = multiply(a, b);
    }
    else if (operator == "÷") {
        if (b == 0) {
            answer = "No 0 division"
        }
        else {
            answer = divide(a, b);
        }
    }
    if (typeof answer === 'number') {
        return Math.round(answer * 100) / 100;
    }
    else {
        return answer;
    }

}
function add(a, b) {
    return (a + b);
}
function subtract(a, b) {
    return (a - b);
}
function multiply(a, b) {
    return (a * b);
}
function divide(a, b) {
    if ((b == 0)) {
        return "ERROR";
    }
    else {
        return (a / b);
    }
}
