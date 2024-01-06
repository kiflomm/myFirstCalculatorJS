// unicode character for &divide; '\u00F7'
//unicode character for &times; '\u00D7'

let toDisplay = "";
let displayBox = document.getElementById('display_input');
let resultBox = document.getElementById('display_result');
let clearButton = document.getElementById('clear');
let backSpace = document.getElementById('back_space');
let equalSign = document.getElementById("equals");
let buttons = document.querySelectorAll(".numbers button:not([id='equals'])");
let operators = document.querySelectorAll(".operators button");

buttons.forEach(button => {
    button.addEventListener('click',()=>{
        toDisplay += button.value;
        displayBox.value = toDisplay;
        resultBox.value = splitInput(toDisplay);
    });
});

operators.forEach(operator =>{
    operator.addEventListener('click',()=>{
        let lastInput = toDisplay[toDisplay.length-1];
        let checkLastInput = (lastInput == '+') || (lastInput == '-') || (lastInput == '\u00F7') || (lastInput == '\u00D7');
        if(checkLastInput)
            toDisplay = toDisplay.slice(0,-1);
        toDisplay += operator.value;
        displayBox.value = toDisplay;
        resultBox.value ="";
    });
});

equalSign.addEventListener('click',()=>{
    resultBox.value = splitInput(toDisplay);
    displayBox.value = splitInput(toDisplay);
    toDisplay = String(splitInput(toDisplay));
})

clearButton.addEventListener("click",()=>{
        toDisplay = "";
        resultBox.value = "";
        displayBox.value = toDisplay;
    }
);

//back space invoked
backSpace.addEventListener("click",()=>{
        toDisplay = toDisplay.slice(0,-1);
        resultBox.value = splitInput(toDisplay);
        displayBox.value = toDisplay;
    }
);

function splitInput(temp){ 
    let total = 0;
    if(temp.includes('-')){
        temp = temp.replace(/-/g,"+-");
    }
    var subOperations = temp.split("+");
    subOperations.forEach(x=>{ 
        if(x.includes("\u00D7")){
            let multipls = x.split("\u00D7");
            let multiplicationResult = 1; 
            multipls.forEach(exp =>{
                if(exp.includes("\u00F7")){
                    let division = exp.split("\u00F7");
                    let divisionReturn = Number(division[0]);
                    for(let i=1;i<division.length;i++){
                        divisionReturn /= Number(division[i]);
                    }
                    multiplicationResult *= divisionReturn;
                }else{
                    multiplicationResult *= Number(exp);
                }
            });
            total += multiplicationResult; 
        }else if(x.includes("\u00F7")){
            let division = x.split("\u00F7");
            let divisionReturn = Number(division[0]);
                for(let i=1;i<division.length;i++){
                    divisionReturn /= Number(division[i]);
                }
            total += divisionReturn;
        }else{
            total += Number(x);
        }
    })
    return total;
}
