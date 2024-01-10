

let savedResults = [];
// localStorage.removeItem("Saved-Results");

let oldData = localStorage.getItem("Saved-Results")
if (oldData) {
    savedResults = [oldData]
}

function isArray(myArray) {
    return myArray.constructor.toString().indexOf("Array") > -1;
  }

function submitResults(event) {
    let all = document.getElementsByTagName("*");
    let inputs = [];
    let results = {};

    for (let i=0, max=all.length; i < max; i++) {
        if (all[i].nodeName === "INPUT" || all[i].nodeName === "TEXTAREA") {
            inputs.push(all[i]);
        }
    } 

    for (let i = 0, max = inputs.length; i < max; i++) {
        results[inputs[i].id] = inputs[i].value;
    }
  
    console.log(results)
    generateQRCode(results)
    
    if (isArray(savedResults)) {
        console.log("array is array")
        savedResults.push(results);
        localStorage.setItem("Saved-Results", savedResults);
    } else {
        console.log("array is not array")
    }
    
}

function generateQRCode(results) {
    let qrText = results.toString()

    let qrcode = new QRious({
        element: document.getElementById("qrcode-2"),
        background: '#ffffff',
        backgroundAlpha: 1,
        foreground: '#000000',
        foregroundAlpha: 1,
        level: 'H',
        padding: 0,
        size: 300,
        value: qrText
      });       
}

function clearForm() {
    let all = document.getElementsByTagName("*");
    let inputs = []

    for (let i=0, max=all.length; i < max; i++) {
        if (all[i].nodeName === "INPUT") {
            inputs.push(all[i]);
        }
    }

    for (let i=0, max=all.length; i < max; i++) {
        if (all[i].nodeName === "TEXTAREA") {
            inputs.push(all[i]);
        }
    }

    for (let i = 0, max = inputs.length; i < max; i++) {
        inputs[i].value = "";
    }
}

document.getElementById("endOfForm").addEventListener('click', submitResults);
document.getElementById("clearForm").addEventListener('click', clearForm);