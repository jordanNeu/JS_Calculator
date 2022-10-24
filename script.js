// Calculator Class Constructor, creates the two objects that will be calculated 
class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }
// Clear Function (AC) that sets all values to blank
clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
}
// Deletes a single digit
delete() {
    this.currentOperand = this.currentOperand
        .toString()
        .slice(0, -1)
}

appendNumber(number) {
    if (number === '.' && this.currentOperand
        .includes('.')) 
        return 
    this.currentOperand = (this.currentOperand ?? '') + number;

}
chooseOperation(operation) {
    if(this.currentOperand === '')
        return
    if(this.previousOperand !== '') {
        this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''

}

operate() {
    // Variable that will hold our computation
    let chosenOperation
    // Converts from Strings to Float for the purpose of computation
    const previous = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    // if either variable is NaN, start over
    if (isNaN(previous) || isNaN(current))
    return
    // Switch statement that will read button pressed and perform an
    // operation based on the operator chosen at time of equal button
    // being pressed
    switch(this.operation) {
        case '+':
            chosenOperation = previous + current
            console.log("Plus!")
            break
        case '-':
            chosenOperation = previous - current
            console.log("minus!")
            break
        case 'x':
            chosenOperation = previous * current
            console.log("TImes!")
            break
        case '÷':
            chosenOperation = previous / isFinite(current)
            console.log("Divide!")
            break
        default:
            console.log("Blank!")
            return;              
    }
    this.currentOperand = chosenOperation
    this.operation = undefined
    this.previousOperand = ''
}
// Changes the display to show last number clicked and holds
// previous number pressed as well as the operator chosen
   updateDisplay() {
    this.currentOperandText.innerText = this.currentOperand
        if (this.operation!= null) {
        this.previousOperandText.innerText = 
            `${this.previousOperand} ${this.operation}`
        }
        else {
        this.previousOperandText.innerText = ''
        }
    }
}
// DOM Selectors
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operator");
const backButton = document.querySelector(".back");
const allClearButton = document.querySelector(".ac");
const equalsButton = document.querySelector(".equals");
const previousOperandText = document.querySelector(".previous-operand")
const currentOperandText = document.querySelector(".current-operand")


const calculator = new Calculator(previousOperandText, currentOperandText)

// Event Listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', button => {
        calculator.operate()
        calculator.updateDisplay()
        console.log("Equals Pressed!")
})
allClearButton.addEventListener('click', button => {
        calculator.clear()
        calculator.updateDisplay()
})
backButton.addEventListener('click', button => {
        calculator.delete()
        calculator.updateDisplay()
})
window.addEventListener('keydown', keyboardInput)

function keyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') numberButtons()
    if (e.key === '=' || e.key === 'Enter') equalsButton()
    if (e.key === 'Escape') allClearButton()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        chooseOperation()
}

function operatorConversion (keyboardOperator) {
    if(keyboardOperator === '/') return '÷'
    if(keyboardOperator === '*') return 'x'
    if(keyboardOperator === '-') return '-'
    if(keyboardOperator === '+') return '+'
}