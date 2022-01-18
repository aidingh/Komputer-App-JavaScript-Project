
let globalComputerJson;


let currentComputerItem;

class KomputerAppDevices{

    constructor(){
        this.computerImgUrl = 'https://noroff-komputer-store-api.herokuapp.com/';
        this.computerJson;
        this.select = document.getElementById("selectNumber");
        this.desc = document.getElementById('descMsg');
        this.komputerImg = document.getElementById('komputerImg');  
        this.komputerPrice = document.getElementById('priceMsg');
        this.komputerSpecList = document.getElementById('specList');
        this.komputerStockAmount = document.getElementById('stockMsg');    
    }
}

KomputerAppDevices.prototype.komputerDataTitleToSelection  = function(computers){

    var obj = JSON.parse(computers);
    globalComputerJson = obj;

    for(var i = 0; i < obj.length; i++) {
        this.select.innerHTML = this.select.innerHTML +'<option value=' + obj[i].id + '>' + obj[i].title + '</option>';
    }

    currentComputerItem = obj[0];

    this.komputerStockAmount.innerHTML = 'Stock amount: ' + obj[0].stock;
    this.komputerSpecList.innerHTML = obj[0].specs;
    computerTitle.innerHTML = obj[0].title;
    this.desc.innerHTML = 'Description: ' + obj[0].description;
    this.komputerPrice.innerHTML = 'Price: '+ obj[0].price + ' SEK';
    this.komputerImg.src = this.computerImgUrl + obj[0].image;
}


KomputerAppDevices.prototype.onKomputerSelectListener = function(){

    var select = document.getElementById("selectNumber")
    var desc = document.getElementById('descMsg');
    var komputerPrice = document.getElementById('priceMsg');
    var komputerImg = document.getElementById('komputerImg');   
    var computerTitle = document.getElementById('computerCardTitle');  

    let selectedItem = globalComputerJson.find(x => x.id == select.value);
    currentComputerItem = selectedItem;

    komputerImg.src = 'https://noroff-komputer-store-api.herokuapp.com/' + selectedItem.image;
    komputerStockAmount.innerHTML = 'Stock amount: ' + selectedItem.stock
    komputerSpecList.innerHTML = selectedItem.specs;
    desc.innerHTML = 'Description: ' + selectedItem.description;
    komputerPrice.innerHTML = 'Price: '+ selectedItem.price + ' SEK';
    computerTitle.innerHTML = selectedItem.title;
    
}

KomputerAppDevices.prototype.attemptToBuyKomputerListener = function(){
    console.log(loanDataStructure.currentUserBalance);
    console.log(currentComputerItem.description);
    if(parseInt(currentComputerItem.stock) > 0 && loanDataStructure.currentUserBalance >= parseInt(currentComputerItem.price)){
        loanDataStructure.currentUserBalance = loanDataStructure.currentUserBalance - parseInt(currentComputerItem.price);
        KomputerAppBank.prototype.updateBankInformation(list, repayList);
        alert("Congrats, you have bought " + currentComputerItem.title + ' for ' + currentComputerItem.price + " SEK");
    }
    else{
        alert("Current user balance is to low: Your balance is " + loanDataStructure.currentUserBalance + ' SEK');
    }
   }
   
