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

compute() {
    let computation
    // Converts our strings back to numbers
    const previous = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(previous) || isNaN(current))
    return
    switch(this.operation) {
        case '+':
            computation = previous + current
            console.log("plus!")
            break
        case '-':
            computation = previous - current
            console.log("minus!")
            break
        case 'X':
            computation = previous * current
            console.log("TImes!")
            break
        case '÷':
            computation = previous / current
            console.log("Divide!")
            break
        default:
            console.log("Blank!")
            return;              
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
}

   updateDisplay() {
    this.currentOperandText.innerText = this.currentOperand
    if (this.operation!= null) {
    this.previousOperandText.innerText = 
    `${this.previousOperand} ${this.operation}`
    }
    else {
        this.previousOperandText.innerText = ''
    }

    // this.currentOperandText.innerText = this.currentOperand
    //     this.previousOperandText.innerText = this.previousOperand
    
    }
}
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operator");
const backButton = document.querySelector(".back");
const allClearButton = document.querySelector(".ac");
const equalsButton = document.querySelector(".equals");
const previousOperandText = document.querySelector(".previous-operand")
const currentOperandText = document.querySelector(".current-operand")


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