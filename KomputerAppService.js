
/**
 * This class retrives data from the service url and returns it to the KomputerAppRunner.js file to be used in further context.
 */

class KomputerAppService{
/**
 * @return {KomputerAppService}
 * @constructor
 */
    constructor(serviceURL){
        this.serviceURL = serviceURL;
        this.deviceObject = new KomputerAppDevices();
    }
}

/**
 * Makes a http.get request and return a json object contianing details about computers.
 * The computer data is then passed ot KomputerAppDevices.js class function "komputerDataTitleToSelection" to display the data.
 * 
 * @param {void} undefined function takes no param as its survice url is reached from the constructor.
 * @return {string} json object containing details about computers.
 */
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

