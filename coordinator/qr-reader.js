// script.js file

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
             alert("You Qr is : " + decodeText, decodeResult);
        if (decodeText !== decoded) {
            console.log(decodeText)
            decoded = decodeText
        }
    }

	let htmlscanner = new Html5QrcodeScanner(
		"my-qr-reader",
		{ fps: 30, qrbos: 250 }
	);
	htmlscanner.render(onScanSuccess);
});
