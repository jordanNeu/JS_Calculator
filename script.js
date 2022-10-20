let currentOperation = null;
// Calculator Class
class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
    }
// Clear Function that sets all values to blank
clear() {
    this.currentOperand= ''
    this.previousOperand = ''
    this.operationButtons = undefined
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
    if(this.previousOperans !== '') {
        this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''

}

compute() {
    let computation
    // Converts our strings back to numbers
    const previous = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(!isNaN(previous) || isNaN(current))
        return
    switch (this.operation) {
        case '+':
            computation = previous + current
            break
        case '-':
            computation = previous - current
            break
        case '*':
            computation = previous * current
            break
        case '÷':
            computation = previous / current
            break
        default: 
            return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
}

updateDisplay() {
    this.currentOperandText.innerHTML = this.currentOperand
    this.previousOperandText.innerHTML = this.previousOperand
}

}
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operator");
const backButton = document.querySelector(".back");
const allClearButton = document.querySelector(".ac");
const equalsButton = document.querySelector(".equals");
const previousOperandText = document.querySelector('[data-previous-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandText, currentOperandText)
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
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

backButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})