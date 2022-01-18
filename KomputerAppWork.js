
/**
 * This class is the controller module for everything to do with computer devices. 
 * As it acts like a server response when user changes computer items and attempts to buy a computer item.
 */

let newSaleryAmount = 0.0;

class KomputerAppWork{
    
    constructor(){
        this.initialPayBalance = 0.0;
    }
}

/**
 * Instanciate the pay salery. The function only gets run once by the KomputerAppRunner.js file.
 * 
 * HTML documents varibles are instanciated in the KomputerAppRunner.js file
 * 
 * @param {void} undefined No argument needed as the initial pay salery is set from the constructor.
 * @return {void} returns undefined. 
 */
KomputerAppWork.prototype.intiUserSaleryAmount = function(){
    payMsg.innerHTML = 'Current salery: ' + this.initialPayBalance + ' SEK';
}

/**
 * Increases they pay salery by 100 every time the function gets called. And updates the pay salery in the UI.
 * 
 * HTML documents varibles are instanciated in the KomputerAppRunner.js file
 * 
 * @param {void} newSaleryAmount No argument needed as the function uses the global varible to increase the pay salery.
 * @return {void} returns undefined. 
 */
KomputerAppWork.prototype.inscreasePayOnChangeListener = function(){
    newSaleryAmount = newSaleryAmount + 100;
    KomputerAppWork.prototype.updatePayListener(); 
}


/**
 * Resets the pay salery to zero every time it gets called.
 * 
 * HTML documents varibles are instanciated in the KomputerAppRunner.js file
 * 
 * @param {void} newSaleryAmount No argument needed as the function uses the global varible to zero.
 * @return {void} returns undefined. 
 */
KomputerAppWork.prototype.resetPayListener = function(){
    newSaleryAmount = 0;
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