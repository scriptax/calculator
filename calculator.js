var expCalc = "";
var answer = "";

const checker = {
    lastIsMulDiv : false,
    lastIsOp : false,
    lastIsNum : false,
    parIsOpen : false,
    parIsClosed : false,

    plastIsMulDiv : false,
    plastIsOp : false,
    plastIsNum : false,
    pparIsOpen : false,
    pparIsClosed : false,

    expIsClear : true,
    finalExp : "",
    validate : function (exp, op) {
        this.lastIsMulDiv = /[*/]/.test(exp[exp.length - 1]);
        this.lastIsOp = /[*+/-]/.test(exp[exp.length - 1]);
        this.lastIsNum = /\d/.test(exp[exp.length - 1]);
        this.parIsOpen = /[(]/.test(exp[exp.length - 1]);
        this.parIsClosed = /[)]/.test(exp[exp.length - 1]);

        this.plastIsMulDiv = /[*/]/.test(exp[exp.length - 2]);
        this.plastIsOp = /[*+/-]/.test(exp[exp.length - 2]);
        this.plastIsNum = /\d/.test(exp[exp.length - 2]);
        this.pparIsOpen = /[(]/.test(exp[exp.length - 2]);
        this.pparIsClosed = /[)]/.test(exp[exp.length - 2]);
        //this.expIsClear = exp.length == 0;

        //In case *, / or ) is selected first when screen is clear
        if(this.expIsClear && (this.parIsClosed || this.lastIsMulDiv)) {
            let arr = exp.split("");
            arr.pop();
            this.finalExp = arr.join("");
            this.expIsClear = true;
            this.parIsClosed = false;
            this.lastIsMulDiv = false;
            return this.finalExp;
        }

        //In case user selects an operator twice
        alert(exp)
        if(this.lastIsOp && !(this.expIsClear)) {
            let arr = exp.split("");
            arr.pop();
            arr[arr.length - 1] = op;
            this.finalExp = arr.join("");
            this.lastIsOp = true;
            return this.finalExp;
        }

        //In case (* or (/
        if(this.parIsOpen && this.lastIsMulDiv) {
            let arr = exp.split("");
            arr.pop();
            this.finalExp = arr.join("");
            this.parIsOpen = true;
            this.lastIsMulDiv = false;
            return this.finalExp;
        }

        //In case parenthesis is closed, accept operators only
        if(this.parIsClosed && (this.lastIsNum || this.parIsOpen)) {
            let arr = exp.split("");
            arr.pop();
            this.finalExp = arr.join("");
            this.lastIsNum = false;
            this.parIsOpen = false;
            return this.finalExp;
        }

        //In case user selects ), such that () or 'op')
        if(this.parIsClosed && (this.parIsOpen || this.lastIsOp)) {
            let arr = exp.split("");
            arr.pop();
            this.finalExp = arr.join("");
            this.parIsClosed = false;
            return this.finalExp;
        }
        this.expIsClear = false;
        return exp;
    }
};

function entNum(num){
    let selectedNum = num.innerHTML;

    expCalc += selectedNum;

    expCalc = checker.validate(expCalc, selectedNum);

    display(expCalc);
}

function entOp(op){
    let selectedOp = op.innerHTML;
    
    if(selectedOp === '×') selectedOp = '*';
    if(selectedOp === '÷') selectedOp = '/';

    expCalc += selectedOp;

    expCalc = checker.validate(expCalc, selectedOp);

    display(expCalc);
}

function display(expression){
    let expDisp = expression.replace(/[*]/g, '×');
    expDisp = expDisp.replace(/[/]/g, '÷');
    document.getElementById('screen').innerHTML = expDisp;
}

/*function calc(opElem){  
    opSelected = 1;
    if(newNum == 1){ //In case user taps a sign multiple times
        op.push(opElem.innerHTML);
        numsStr.push(num);
    }
    if(opElem.innerHTML != op[0]){ // In case user changes the sign
        op.pop(); //Dumb the last selected operation sign
        op.push(opElem.innerHTML); //Assign the new operation sign
    }
    if(numsStr.length > 1){
        if(op[0] == "+") {   
            numsStr[0] = eval(numsStr[0]) + eval(numsStr[1]);
            answer = numsStr[0];
        }
        else if(op[0] == "-"){
            numsStr[0] = eval(numsStr[0]) - eval(numsStr[1]);
            answer = numsStr[0];
        }
        else if(op[0] == "x"){
            numsStr[0] = eval(numsStr[0]) * eval(numsStr[1]);
            answer = numsStr[0];
        }
        else if(op[0] == "÷"){
            numsStr[0] = eval(numsStr[0]) / eval(numsStr[1]);
            answer = numsStr[0];
        }
        numsStr.pop();
        op.shift();
        display(answer);  
    }
    newNum = 0; 
}*/