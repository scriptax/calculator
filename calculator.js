var expCalc = "";
var answer = "";
var reset = false;

const checker = {

    validate : function (exp, op) {
        let finalExp = "";
        let plastIsNum = /\d/.test(exp[exp.length - 2]);

        let firstCase = /[*/)]/.test(exp);
        let secondCase = /[*+/-][*+/-]/.test(exp);
        let thirdCase = /([(][*/])|([(][+-][*/])/.test(exp);
        let forthCase = /[)][0-9.]/.test(exp);
        let fifthCase = /[(+*/-][)]/.test(exp);
        let sixthCase = /[0-9.)][(]/.test(exp);

        let checkResult = thirdCase || forthCase ||
        fifthCase || sixthCase;

        //In case user selects * or / or ) first
        if(exp.length <= 2 && firstCase && !plastIsNum) {
            let arr = exp.split("");
            arr.pop();
            finalExp = arr.join("");
            return finalExp;
        }

        //In case user selects an operator twice
        if(secondCase && !thirdCase) {
            let arr = exp.split("");
            arr.pop();
            arr[arr.length - 1] = op;
            finalExp = arr.join("");
            return finalExp;
        }

        //Other safety cases
        if(checkResult) {
            let arr = exp.split("");
            arr.pop();
            finalExp = arr.join("");
            return finalExp;
        }

        return exp;
    },

    finalCheck : function(exp){
        let openPars = exp.match(/[(]/g) == null ? 0 : exp.match(/[(]/g).length;
        let closePars = exp.match(/[)]/g) == null ? 0 : exp.match(/[)]/g).length;
        if(openPars != closePars){
            alert("Uneven parenthesis used!");
            return true;
        }

        if(/[*/+-]/.test(exp[exp.length - 1])){
            alert("Invalid end of expression!");
            return true;
        }
        return false;
    }
};

function entNum(num){
    let selectedNum = num.innerHTML;

    if(reset) {
        display("");
        expCalc = "";
        reset = false
    }

    expCalc += selectedNum;

    expCalc = checker.validate(expCalc, selectedNum);

    display(expCalc);
}

function entOp(op){
    let selectedOp = op.innerHTML;

    reset = false;
    
    if(selectedOp === '×') selectedOp = '*';
    if(selectedOp === '÷') selectedOp = '/';

    expCalc += selectedOp;

    expCalc = checker.validate(expCalc, selectedOp);

    display(expCalc);
}

function calculate(){
    if(checker.finalCheck(expCalc) === true) return undefined;

    answer = eval(expCalc);   
    expCalc = String(answer);
    reset = true;
    display(String(answer));
}

function clearAll(){
    expCalc = "";
    answer = "";
    reset = false;
    display(expCalc);
}

function backSpace(){
    let arr = expCalc.split("");
    arr.pop();
    expCalc = arr.join("");
    display(expCalc);
}

function display(expression){
    let expDisp = expression.replace(/[*]/g, '×');
    expDisp = expDisp.replace(/[/]/g, '÷');
    document.getElementById('screen').innerHTML = expDisp;
}