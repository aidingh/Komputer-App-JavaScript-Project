
/**
 * This class is the controller module for everything to do with computer devices. 
 * As it acts like a server response when user changes computer items and attempts to buy a computer item.
 */

let globalComputerJson;
let currentComputerItem;

class KomputerAppDevices{
/**
 * @return {KomputerAppDevices}
 * @constructor
 */
    constructor(){
        this.computerImgUrl = 'https://noroff-komputer-store-api.herokuapp.com/';
    }
}

/**
 * Sets the computer data to the HTML elements. HTML documents variables are instantiated in the KomputerAppRunner.js file
 *
 * @param {string} computers contains the json object containing details about the computers.
 * @return {void} Does not return anything, but sets the computer data to the HTML elements.
 */
KomputerAppDevices.prototype.komputerDataTitleToSelection  = function(computers){

    var obj = JSON.parse(computers);
    globalComputerJson = obj;

    for(var i = 0; i < obj.length; i++) {
        select.innerHTML = select.innerHTML +'<option value=' + obj[i].id + '>' + obj[i].title + '</option>';
    }

    currentComputerItem = obj[0];

    komputerStockAmount.innerHTML = 'Stock amount: ' + obj[0].stock;
    computerTitle.innerHTML = obj[0].title;

    loanList.innerHTML = loanDataStructure.loans.map(i => `<li>${'Recent loans: ' + i + ' SEK ' + '  ' + dateObj.toLocaleString()} </li>`).join('');
    repayList.innerHTML = loanDataStructure.loans.map(i => `<li>${'Recent loans: ' + i + ' SEK ' + '  ' + dateObj.toLocaleString()} </li>`).join('');

    KomputerAppDevices.prototype.printComputerDataDescToUi(obj[0].specs);

    desc.innerHTML = 'Description: ' + obj[0].description;
    komputerPrice.innerHTML = 'Price: '+ obj[0].price + ' SEK';
    komputerImg.src = this.computerImgUrl + obj[0].image;
}

/**
 * This function is make to list the computer specs line by line. Instead of a large single message.
 *
 * @param {list} computerDescList takes in the list in order to display the computer specs in the UI.
 * @return {void} undefined
 */
KomputerAppDevices.prototype.printComputerDataDescToUi  = function(computerDescList){
    for(var i = 0; i < computerDescList.length; i++) {
        komputerSpecList.innerHTML = computerDescList.map(i => `<li>${i} </li>`).join('');
    }
}

/**
 * Sets the computer data to the HTML elements when a change occurs on the client side. Such as changing computer item. 
 * The global scoped variables is a list using the build in .find() method. Its a O(n) as its searches in a linear fashion.
 * HTML documents variables are instantiated in the KomputerAppRunner.js file
 *
 * @param {void} globalComputerJson Function takes no input, but uses the global scoped variable that contains the same computer details.
 * @return {void} Does not return anything, but sets the computer data to the HTML elements when a changed have occurred from the client. Such as changing the computer item.
 */
KomputerAppDevices.prototype.onKomputerSelectListener = function(){
    let selectedItem = globalComputerJson.find(x => x.id == select.value);
    currentComputerItem = selectedItem;

    komputerImg.src = 'https://noroff-komputer-store-api.herokuapp.com/' + selectedItem.image;
    komputerStockAmount.innerHTML = 'Stock amount: ' + selectedItem.stock

    KomputerAppDevices.prototype.printComputerDataDescToUi(selectedItem.specs);

    desc.innerHTML = 'Description: ' + selectedItem.description;
    komputerPrice.innerHTML = 'Price: '+ selectedItem.price + ' SEK';
    computerTitle.innerHTML = selectedItem.title;
}

/**
 * When user attempts to buy a computer this function is run. It checks the requirements needed to buy a computer.
 * ATTENTION: the stock amount does not decrease when the client attempts to buy a computer! This is something that can be implemented later. And is out of the project scope.
 * The global scoped variables is the current item selected buy the user that he/she is attempting to buy.
 * HTML documents variables are instantiated in the KomputerAppRunner.js file
 *
 * @param {void} currentComputerItem Function takes no input, but uses the global scoped variable that contains current selected computer item.
 * @return {void} Does not return anything, but alerts the client if the requirements are met when attempting to buy a computer.
 */
KomputerAppDevices.prototype.attemptToBuyKomputerListener = function(){

    if(parseInt(currentComputerItem.stock) > 0 && loanDataStructure.currentUserBalance >= parseInt(currentComputerItem.price)){
        loanDataStructure.currentUserBalance = loanDataStructure.currentUserBalance - parseInt(currentComputerItem.price);
        let historyObject = {occurence:"Recent purchase: ", amount: currentComputerItem.price, date: dateObj.toLocaleString()};
        loanDataStructure.historyList.push(historyObject);
        KomputerAppBank.prototype.updateBankInformation();
        alert("Congrats, you have bought " + currentComputerItem.title + ' for ' + currentComputerItem.price + " SEK");
    }
    else{
        alert("Current user balance is to low: Your balance is " + loanDataStructure.currentUserBalance + ' SEK');
    }
   }
   
