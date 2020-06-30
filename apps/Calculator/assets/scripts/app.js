const defaultResult = 0
let currentResult = defaultResult

// Get input from the input filed
const getUserInput = () =>{
    return parseInt(userInput.value)
};

const summationFun = () =>{
    const entryNum = getUserInput()
    var txt = `${currentResult} + ${entryNum}`
    currentResult += entryNum
    outputResult(currentResult, txt) // from vendor file
};

const subtractionFun = () =>{
    const entryNum = getUserInput()
    var txt = `${currentResult} - ${entryNum}`
    currentResult -= entryNum
    outputResult(currentResult, txt)// from vendor file
};
const multiplicationFun = () =>{
    const entryNum = getUserInput()
    var txt = `${currentResult} * ${entryNum}`
    currentResult = 1
    currentResult *= entryNum
    outputResult(currentResult, txt)// from vendor file
};
const divisionFun = () =>{
    const entryNum = getUserInput()
    var txt = `${currentResult} / ${entryNum}`
    currentResult = 1
    currentResult /= entryNum
    outputResult(currentResult, txt)// from vendor file
};

addBtn.addEventListener('click', summationFun)
subtractBtn.addEventListener('click', subtractionFun)
multiplyBtn.addEventListener('click', multiplicationFun)
divideBtn.addEventListener('click', divisionFun)

