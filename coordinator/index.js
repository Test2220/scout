let savedResults = []

let oldData = localStorage.getItem("Saved-Scanned")
if (oldData) {
    savedResults = [oldData]
}

function domReady(fn) {
	if (
		document.readyState === "complete" ||
		document.readyState === "interactive"
	) {
		setTimeout(fn, 1000);
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}

domReady(function () {
    let decoded

	// If found you qr code
	function onScanSuccess(decodeText, decodeResult) {
         //    alert("You Qr is : " + decodeText, decodeResult);
        if (decodeText !== decoded) {
			decoded = decodeText

			decodeText = JSON.parse(decodeText)

			if (isArray(decodeText)) {
				console.log("array is array")
				savedResults.push(decodeText);
				localStorage.setItem("Saved-Scanned", savedResults);
			} else {
				console.log("array is not array")
			}
			
		}
    }

	let htmlscanner = new Html5QrcodeScanner(
		"my-qr-reader",
		{ fps: 30, qrbos: 250 }
	);
	htmlscanner.render(onScanSuccess);
});

function Export() {
	let data = localStorage.getItem("Saved-Scanned")
	
	for (i = 0; max = data.length, i < max; i++) {
		let keys = Object.keys(data[i])
		console.log(keys)
	}
}

document.getElementById("Export").addEventListener('click', Export);