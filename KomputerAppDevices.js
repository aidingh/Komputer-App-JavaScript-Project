
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
 * Sets the computer data to the HTML elements. HTML documents varibles are instanciated in the KomputerAppRunner.js file
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
    komputerSpecList.innerHTML = obj[0].specs;
    computerTitle.innerHTML = obj[0].title;
    desc.innerHTML = 'Description: ' + obj[0].description;
    komputerPrice.innerHTML = 'Price: '+ obj[0].price + ' SEK';
    komputerImg.src = this.computerImgUrl + obj[0].image;
}

/**
 * Sets the computer data to the HTML elements when a change occurs on the client side. Such as changing computer item. 
 * The global scoped varibles is a list using the build in .find() method. Its a O(n) as its searches in a linear fashion.
 * HTML documents varibles are instanciated in the KomputerAppRunner.js file
 *
 * @param {void} globalComputerJson Function takes no input, but uses the global scoped varible that contains the same computer details.
 * @return {void} Does not return anything, but sets the computer data to the HTML elements when a changed have occured from the client. Such as changeing the computer item.
 */
KomputerAppDevices.prototype.onKomputerSelectListener = function(){

    let selectedItem = globalComputerJson.find(x => x.id == select.value);
    currentComputerItem = selectedItem;

    komputerImg.src = 'https://noroff-komputer-store-api.herokuapp.com/' + selectedItem.image;
    komputerStockAmount.innerHTML = 'Stock amount: ' + selectedItem.stock
    komputerSpecList.innerHTML = selectedItem.specs;
    desc.innerHTML = 'Description: ' + selectedItem.description;
    komputerPrice.innerHTML = 'Price: '+ selectedItem.price + ' SEK';
    computerTitle.innerHTML = selectedItem.title;
}

/**
 * When user attempts to buy a computer this function is run. It checks the requiremts needed to buy a computer.
 * The global scoped varibles is the current item selected buy the user that he/she is attempting to buy.
 * HTML documents varibles are instanciated in the KomputerAppRunner.js file
 *
 * @param {void} currentComputerItem Function takes no input, but uses the global scoped varible that contains current selected computer item.
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
   
