let savedResults = [];
// localStorage.removeItem("Saved-Scanned")
// try {
// 	let oldData = JSON.parse(localStorage.getItem("Saved-Scanned"))
// 	if (!oldData) {
// 		savedResults = []
// 	} else if (Array.isArray(oldData)) {
// 		savedResults = oldData
// 	}
// } catch {}

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
	let decoded;

	// If found you qr code
	function onScanSuccess(decodeText, decodeResult) {
		//    alert("You Qr is : " + decodeText, decodeResult);
		if (decodeText !== decoded) {
			console.log("Scanned");
			decoded = decodeText;

			decodeText = JSON.parse(decodeText);
			console.log(decodeText);

			savedResults.push(decodeText);
			localStorage.setItem("Saved-Scanned", JSON.stringify(savedResults));
		//	console.log(localStorage.getItem("Saved-Scanned"));
		}
	}

	let htmlscanner = new Html5QrcodeScanner("my-qr-reader", {
		fps: 30,
		qrbos: 250,
	});
	htmlscanner.render(onScanSuccess);
});

// function domReady(fn) {
//     if (
//         document.readyState === "complete" ||
//         document.readyState === "interactive"
//     ) {
//         setTimeout(fn, 1000);
//     } else {
//         document.addEventListener("DOMContentLoaded", fn);
//     }
// }
 
// domReady(function () {
 
//     // If found you qr code
//     function onScanSuccess(decodeText, decodeResult) {
//         alert("You Qr is : " + decodeText, decodeResult);
//     }
 
//     let htmlscanner = new Html5QrcodeScanner(
//         "my-qr-reader",
//         { fps: 10, qrbos: 250 }
//     );
//     htmlscanner.render(onScanSuccess);
// });

// function downloadBlob(content, filename, contentType) {
// 	// Create a blob
// 	var blob = new Blob([content], { type: contentType });
// 	var url = URL.createObjectURL(blob);

// 	// Create a link to download it
// 	var pom = document.createElement('a');
// 	pom.href = url;
// 	pom.setAttribute('download', filename);
// 	pom.click();
// }

// function arrayToCsv(data) {
// 	return data.map(row =>
// 		row
// 			.map(String)  // convert every value to String
// 			.map(v => v.replaceAll('"', '""'))  // escape double quotes
// 			.map(v => `"${v}"`)  // quote it
// 			.join(',')  // comma-separated
// 	).join('\r\n');  // rows starting on new lines
// }

// function Export() {
// 	let data = JSON.parse(localStorage.getItem("Saved-Scanned"))

// 	let allKeys = []

// 	for (i = 0; imax = data.length, i < imax; i++) {
// 		keys = Object.keys(data[i])
// 		for (v = 0; vmax = keys.length, v < vmax; v++) {
// 			if (allKeys.indexOf(keys[v]) == -1) {
// 				allKeys.push(keys[v])
// 			}
// 		}
// 	}

// 	let csv = [allKeys]

// 	for (i = 0; imax = data.length, i < imax; i++) {
// 		let push = []
// 		for (v = 0; vmax = allKeys.length, v < vmax; v++) {
// 			if (allKeys[v] in data[i]) {
// 				push.push(data[i][allKeys[v]])
// 			}
// 		}
// 		csv.push(push)
// 	}

// 	let file = arrayToCsv(csv)
// 	downloadBlob(file, 'scouting_data.csv', 'text/csv;charset=utf-8;')
// }

// document.getElementById("Export").addEventListener('click', Export);
