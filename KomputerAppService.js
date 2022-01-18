

class KomputerAppService{
    
    constructor(serviceURL){
        this.serviceURL = serviceURL;
        this.select = document.getElementById("selectNumber");
        this.desc = document.getElementById('descMsg');
        this.deviceObject = new KomputerAppDevices();
    }
}

KomputerAppService.prototype.getKomputerData = async function(){
    
    let response = fetch(this.serviceURL);
    if((await response).status == 200){
        let computerData = await (await response).text();
        this.deviceObject.komputerDataTitleToSelection(computerData);
        return computerData;
    }
    else{
        console.log('Something went wrong, could not get computer data');
    }
}

