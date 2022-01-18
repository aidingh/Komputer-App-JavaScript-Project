

var list  = document.getElementById('loanList');
var repayList  = document.getElementById('repayList');
var bankHistoryList  = document.getElementById('bankHistoryList');

let newSaleryAmount = 0.0;
class KomputerAppWork{
    
    constructor(){
        this.initialPayBalance = 0.0;
    }
}

KomputerAppWork.prototype.intiUserSaleryAmount = function(){
    payMsg.innerHTML = 'Current salery: ' + this.initialPayBalance + ' SEK';
   }
   

KomputerAppWork.prototype.inscreasePayOnChangeListener = function(){
 newSaleryAmount = newSaleryAmount + 100;
 KomputerAppWork.prototype.updatePayListener(); 
}


KomputerAppWork.prototype.updatePayListener = function(){
    payMsg.innerHTML = 'Current salery: ' + newSaleryAmount;
}

   KomputerAppWork.prototype.transferSaleryToBankListener = function(){
        if(newSaleryAmount > 0 && loanDataStructure.loans[loanDataStructure.loans.length - 1] != undefined){

            let fractionAmount = newSaleryAmount * 0.10;
            newSaleryAmount = newSaleryAmount - fractionAmount;

            loanDataStructure.totalLoanAmount =  loanDataStructure.totalLoanAmount - fractionAmount;
            loanDataStructure.currentUserBalance = loanDataStructure.currentUserBalance + newSaleryAmount;
            loanDataStructure.loans[loanDataStructure.loans.length - 1] = loanDataStructure.loans[loanDataStructure.loans.length - 1] - fractionAmount;
            loanDataStructure.tranfers.push(newSaleryAmount);

            newSaleryAmount = 0;
            KomputerAppBank.prototype.updateBankInformation(list, repayList);
            KomputerAppWork.prototype.updatePayListener();

        }
        else{
            loanDataStructure.currentUserBalance =  loanDataStructure.currentUserBalance + newSaleryAmount;
            loanDataStructure.tranfers.push(newSaleryAmount);
            newSaleryAmount = 0;
            KomputerAppBank.prototype.updateBankInformation(list, repayList);
            KomputerAppWork.prototype.updatePayListener();
        }
   }