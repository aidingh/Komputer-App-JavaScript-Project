


/**
 * This class handles the cliens input. And checks if its meets the requirements to take a loan. 
 * As the Prompt module needs needs to handle many cases it suited best to have it as a separate module.
 * It has a empty constructor if need to set any values in the future.
 */
class KomputerAppBankPrompt{
    
    constructor(){
    }
}

/**
 * The infamous prompt. The client specifies its input. But there can only be positive integer values. This code handles thoose cases.
 * The code also handles specifications made by the project directive. Such as the client cant have more that 2x loans if the initial loan is not payed back.
 * 
 * HTML documents varibles are instanciated in the KomputerAppRunner.js file
 *
 * @param {void} input Input values specified by the client.
 * @return {boolean} returns true to exit promt and false to close promt 
 */
 KomputerAppBankPrompt.prototype.getLoanPrompt = function(){
    
    if(loanDataStructure.currentUserBalance == 0){
        alert("Current bank balance is " + loanDataStructure.currentUserBalance + " SEK. Transfer money to bank salery to continue");
        return;
    }
    else{
        while(true){
            let input = prompt("Input loan amount: ");
            if (input == null) {
                alert("You have cancelled your loan application");
                return true;
            }
            else if (input.length <= 0 || isNaN(input)) {
                alert("Please enter loan amount to continue");
            }
            else if(parseInt(input) <= 0){
                alert("Please enter a loan value greater than 0");
    
            }
            else if(KomputerAppBankPrompt.prototype.updateUserBalance(parseInt(input))){
                alert("Loan have been submitted");
                return true;
            }
            else{
                return false;
            }
        }
    }
}

/**
 * This functions gets excecuted in the .getLoanPromt() function. It checks the project directives. 
 * Such as the client cant have more that 2x loans if the initial loan is not payed back. And that the client cant borrow twice the current user balance.
 * If the requirements are met, the client can take a loan and the UI gets updated.
 * 
 * HTML documents varibles are instanciated in the KomputerAppRunner.js file
 *
 * @param {number} newLoanAmount New loan amount specified by the client.
 * @return {boolean} returns true if the loan attempt was succesfull and false if not.
 */
 KomputerAppBankPrompt.prototype.updateUserBalance = function(newLoanAmount){

    if(newLoanAmount > (loanDataStructure.currentUserBalance)*2){
        alert("Loans can not be twice the amount of your current balance");
        return false;
    }
    else if(loanDataStructure.loans.length == 2){
        alert("Repay your last loan fully to take take a new loan ");
        return false;
    }
    else{
        loanDataStructure.currentUserBalance = loanDataStructure.currentUserBalance + newLoanAmount;
        loanDataStructure.totalLoanAmount = loanDataStructure.totalLoanAmount + newLoanAmount;
        loanDataStructure.loans.push(newLoanAmount);

        let historyObject = {occurence:"Recent loan: ", amount: newLoanAmount.toString(), date: dateObj.toLocaleString()};
        loanDataStructure.historyList.push(historyObject);

        KomputerAppBank.prototype.updateBankInformation();
        return true;
    }
}