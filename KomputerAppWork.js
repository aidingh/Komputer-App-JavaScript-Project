
/**
 * This class is the controller module for everything to do with the work panel. 
 * It handles all the work related interactions made by the client.
 */

let newSaleryAmount = 0.0;

class KomputerAppWork{
/**
 * @return {KomputerAppWork}
 * @constructor
 */
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

/**
 * Updates the current pay salery in the UI.
 * 
 * HTML documents varibles are instanciated in the KomputerAppRunner.js file
 * 
 * @param {void} newSaleryAmount No argument needed as the function uses the global varible to zero.
 * @return {void} returns undefined. 
 */
KomputerAppWork.prototype.updatePayListener = function(){
    payMsg.innerHTML = 'Current salery: ' + newSaleryAmount;
}

/**
 * Heavy duty function. This function transfers money to the bank salery and updates it for the client UI.
 * If the client has a initial loan, then 10% of the salery must first be deducted and transfered to the outstanding loan amount.
 *  
 * HTML documents varibles are instanciated in the KomputerAppRunner.js file
 * 
 * @param {void} newSaleryAmount No argument needed as the function uses the global varible to zero.
 * @return {void} returns undefined. 
 */
   KomputerAppWork.prototype.transferSaleryToBankListener = function(){
        if(newSaleryAmount > 0 && loanDataStructure.loans[loanDataStructure.loans.length - 1] != null){

            let fractionAmount = newSaleryAmount * 0.10;
            newSaleryAmount = newSaleryAmount - fractionAmount;

            loanDataStructure.totalLoanAmount =  loanDataStructure.totalLoanAmount - fractionAmount;
            loanDataStructure.currentUserBalance = loanDataStructure.currentUserBalance + newSaleryAmount;
            loanDataStructure.loans[loanDataStructure.loans.length - 1] = loanDataStructure.loans[loanDataStructure.loans.length - 1] - fractionAmount;
            
            let historyObject = {occurence:"Transfer: ", amount: newSaleryAmount.toString(), date: dateObj.toLocaleString()};
            loanDataStructure.historyList.push(historyObject);

            newSaleryAmount = 0;
            KomputerAppBank.prototype.updateBankInformation();
            KomputerAppWork.prototype.updatePayListener();

        }
        else if(newSaleryAmount == 0){
            alert("Add work to be able to transfer money to the bank.")
        }
        else{
            loanDataStructure.currentUserBalance =  loanDataStructure.currentUserBalance + newSaleryAmount;
            
            let historyObject = {occurence:"Transfer: ", amount: newSaleryAmount.toString(), date: dateObj.toLocaleString()};
            loanDataStructure.historyList.push(historyObject);
            console.log(loanDataStructure.historyList);

            newSaleryAmount = 0;
            KomputerAppBank.prototype.updateBankInformation();
            KomputerAppWork.prototype.updatePayListener();
        }
   }