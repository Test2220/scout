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
			console.log(decodeText)

			// if (isArray(savedResults)) {
			// 	console.log("array is array")
			// 	savedResults.push(results);
			// 	localStorage.setItem("Saved-Scanned", savedResults);
			// } else {
			// 	console.log("array is not array")
			// }
			
		}
    }

	let htmlscanner = new Html5QrcodeScanner(
		"my-qr-reader",
		{ fps: 30, qrbos: 250 }
	);
	htmlscanner.render(onScanSuccess);
});

function Export() {
    console.log("Export")
}

document.getElementById("Export").addEventListener('click', Export);