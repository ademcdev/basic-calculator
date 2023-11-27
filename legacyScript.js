const calculator = document.querySelector(".calculator")
const keys = document.querySelector(".calculatorKeys")
const display = document.querySelector(".calculatorDisplay")
const info = document.querySelector(".calculatorInfo")

const calculate = (n1 , operator, n2) => {
    let result = ""

    if(operator === "add") {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === "subtract") {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === "multiply") {
        result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === "divide") {
        result = parseFloat(n1) / parseFloat(n2)
    }

    return result
}

keys.addEventListener("click", e => {
    if(e.target.matches("button")) {

        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousNum = info.textContent
        const previousKeyType = calculator.dataset.previousKeyType
        const previousValue = calculator.dataset.previousValue

        Array.from(key.parentNode.children)
        .forEach(parametre1 => parametre1.classList.remove("is-depressed"))

        //Array.from(key.parentNode.children)
        //.forEach(k => calculator.dataset.previousKeyType = "none")

        ///////////////////////////////////////////////////
        // NUMBER KEYS SECTİON
 
        if (!action) {
            console.log("number");
            if (displayedNum === "0" || 
            previousKeyType === "operator" ||
            previousKeyType === "calculate")
            {
                display.textContent = keyContent
                info.textContent = previousValue
            }
            else
            {
                display.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKeyType = "number"
        }

        ///////////////////////////////////////////////////
        // DECİMAL KEY SECTİON
 
        if (action === 'decimal') {

            if (!displayedNum.includes("."))
            {
                display.textContent = displayedNum + "."
            }
            else if (previousKeyType === "operator" || previousKeyType === "calculate")
            {
                display.textContent = "0."
            }

            calculator.dataset.previousKeyType = "decimal"
        }

        ///////////////////////////////////////////////////
        // OPERATOR KEY SECTİON
 
        if (
            action === "add" || 
            action === "subtract" || 
            action === "multiply" || 
            action === "divide"
        ) {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            if (displayedNum) {
                previousValue = displayedNum
            }
            else {

            }

            if(firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "calculate") {
                const calcValue = calculate(firstValue, operator, secondValue)

                display.textContent = calcValue

                calculator.dataset.firstValue = calcValue
            }
            else {
                calculator.dataset.firstValue = displayedNum
            }

            key.classList.add("is-depressed")
            calculator.dataset.previousKeyType = "operator"
            calculator.dataset.operator = action
        }

        ///////////////////////////////////////////////////
        // CLEAR KEY SECTİON
 
        if (action === 'clear') {
            
            if (key.textContent === "AC")
            {
                calculator.dataset.firstValue = ""
                calculator.dataset.previousKeyType = ""
                calculator.dataset.operator = ""
                calculator.dataset.modValue = ""
            }
            else
            [
                key.textContent = "AC"
            ]

            display.textContent = 0

            calculator.dataset.previousKeyType = "clear"
        }

        if (action !== "clear")
        {
            const clearButton = calculator.querySelector("[data-action=clear]")

            clearButton.textContent = "CE"
        }

        ///////////////////////////////////////////////////
        // CALCULATE KEY SECTİON

        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum

            if (firstValue) {

                if (previousKeyType === "calculate") {

                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }
                
                display.textContent = calculate(firstValue, operator, secondValue)        
            }

            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = "calculate"
        }
    }
})