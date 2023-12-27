const calculate = (n1 , operator, n2) => {
    const firstNum = parseFloat(n1)
    const secondNum = parseFloat(n2)
    if (operator === "add") return firstNum + secondNum
    if (operator === "subtract") return firstNum - secondNum
    if (operator === "multiply") return firstNum * secondNum
    if (operator === "divide") return firstNum / secondNum
}

const getKeyType = key => {
    const {action} = key.dataset

    if (!action) return "number"
    if (action === "add" || action === "subtract" || action === "multiply" || action === "divide") return "operator"
    // For everything else, return the action
    return action
}

const createResultString = (key, displayedNum, state) => {
    // Variables & properties required:
    // key {keyContent}
    // displayedNum
    // state {previousKeyType, firstValue, operator, modValue}
    const keyContent = key.textContent
    const keyType = getKeyType(key)
    const {firstValue, operator, modValue, previousKeyType} = state
    // const previousKeyType = state.previousKeyType
    // const firstValue = state.firstValue
    // const operator = state.operator
    // const modValue = state.modValue

    // NUMBER KEYS SECTİON
    if (keyType === "number")
    {
        /*
        if (displayedNum === "0" || 
            previousKeyType === "operator" ||
            previousKeyType === "calculate")
            {
                display.textContent = keyContent
            }
            else
            {
                display.textContent = displayedNum + keyContent
            } 
        */ // Ternary & Pure func
        return displayedNum === "0" || previousKeyType === "operator" || previousKeyType === "calculate"
        ? keyContent
        : displayedNum + keyContent
    }
    // DECİMAL KEY SECTİON
    if (keyType === "decimal")
    {
        if (!displayedNum.includes(".")) return displayedNum + "."
        if (previousKeyType === "operator" || previousKeyType === "calculate") return "0."
        return displayedNum
    }
    // OPERATOR KEY SECTİON
    if (keyType === "operator")
    {
        return firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "calculate"
        ? calculate(firstValue, operator, displayedNum)
        : displayedNum
    }
    // CLEAR KEY SECTİON
    if (keyType === "clear") return 0
    // CALCULATE KEY SECTİON
    if (keyType === "calculate")
    {
        return firstValue
            ? previousKeyType === "calculate"
                ? calculate(displayedNum, operator, modValue)
                : calculate(firstValue, operator, displayedNum)
            : displayedNum
    }
}

const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
    // Variables and properties needed
    // 1. key
    // 2. calculator
    // 3. calculatedValue
    // 4. displayedNum
    // 5. modValue (calculator.dataset)
    const keyType = getKeyType(key)
    const {firstValue, operator, modValue, previousKeyType} = calculator.dataset
    calculator.dataset.previousKeyType = keyType
    // OPERATOR KEY SECTİON
    if (keyType === "operator") 
    {
        calculator.dataset.operator = key.dataset.action

        calculator.dataset.firstValue = firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "calculate"
        ? calculatedValue
        : displayedNum
    }
    // CALCULATE KEY SECTİON
    if (keyType === "calculate")
    {
        calculator.dataset.modValue = firstValue && previousKeyType === "calculate"
        ? modValue
        : displayedNum
    }
    // CLEAR KEY SECTİON
    if (keyType === "clear" && key.textContent === "AC")
    {
        calculator.dataset.firstValue = ""
        calculator.dataset.modValue = ""
        calculator.dataset.operator = ""
        calculator.dataset.previousKeyType = ""
    }
}

const updateVisualState = (key, calculator) => {
    const keyType = getKeyType(key)
    Array.from(key.parentNode.children).forEach(param1 =>param1.classList.remove("is-depressed"))

    if (keyType === "operator") key.classList.add("is-depressed")
    if (keyType === "clear" && key.textContent !== "AC") key.textContent = "AC"
    if (keyType !== "clear")
    {
        const clearButton = calculator.querySelector('[data-action=clear]')
        clearButton.textContent = "CE"
    }
}

const calculator = document.querySelector(".calculator")
const display = calculator.querySelector(".calculatorDisplay")
const keys = calculator.querySelector(".calculatorKeys")

keys.addEventListener("click", e => {
    if (!e.target.matches("button")) return

    const key = e.target
    const displayedNum = display.textContent
    //const previousNum = previous.textContent

    // Pure Functions
    const resultString = createResultString(key, displayedNum, calculator.dataset)

    // Update States
    display.textContent = resultString
    //previous.textContent = keyContent
    updateCalculatorState(key, calculator, resultString, displayedNum)
    updateVisualState(key, calculator)
})
