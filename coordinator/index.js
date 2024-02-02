import { sendRows } from "https://scout-2220.vercel.app/coordinator/sheet.js";

// if (sendFunction) {
// 	sendFunction()
// }

////////////////////////////////////////////////////////////////////////


let savedResults = JSON.parse(localStorage.getItem("Saved-Scanned")) || [];
// console.log(savedResults);

//localStorage.removeItem("Saved-Scanned")
try {
	startTable()

	for (i = 0; i < savedResults.length; i++) {
		let pushed = [];
		// console.log(savedResults[i]);
		for (let [key, value] of Object.entries(savedResults[i])) {
			pushed.push(value);
			// console.log(value);
		}
		// console.log(pushed)
		addToTable(pushed);
	}
} catch {}

let created = false;

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

const banner = document.getElementById("success-banner");

function success() {
	// console.log("success");
	banner.style.backgroundColor = "#35d967";
	banner.style.color = "#ffffff";
	banner.innerHTML = "QR code scanned";
}

function successClear() {
	// console.log("success clear");
	banner.style.backgroundColor = "#ffffff";
	banner.style.color = "#000000";
	banner.innerHTML = "Coordinator";
}

let timeout;

domReady(function () {
	let decoded;

	// If found you qr code
	function onScanSuccess(decodeText, decodeResult) {
		//    alert("You Qr is : " + decodeText, decodeResult);
		if (decodeText !== decoded) {
			success();
			timeout = setTimeout(successClear, 3000, successClear);

			//alert("QR code scanned")
			// console.log("Scanned");
			decoded = decodeText;

			decodeText = JSON.parse(decodeText);
			console.log(decodeText);

			let newData = [];

			for (let [key, value] of Object.entries(decodeText)) {
				newData.push(value);
			}

			addToTable(newData);

			savedResults.push(decodeText);
			localStorage.setItem("Saved-Scanned", JSON.stringify(savedResults));
			//console.log(localStorage.getItem("Saved-Scanned"))
		}
	}

	let htmlscanner = new Html5QrcodeScanner("my-qr-reader", {
		fps: 30,
		qrbos: 250,
	});
	htmlscanner.render(onScanSuccess);
});

function downloadBlob(content, filename, contentType) {
	// Create a blob
	var blob = new Blob([content], { type: contentType });
	var url = URL.createObjectURL(blob);

	// Create a link to download it
	var pom = document.createElement("a");
	pom.href = url;
	pom.setAttribute("download", filename);
	pom.click();
}

function arrayToCsv(data) {
	return data
		.map(
			(row) =>
				row
					.map(String) // convert every value to String
					.map((v) => v.replaceAll('"', '""')) // escape double quotes
					.map((v) => `"${v}"`) // quote it
					.join(",") // comma-separated
		)
		.join("\r\n"); // rows starting on new lines
}

function startTable() {
	// console.log("starting table");

	let keys = [
		"match",
		"scouter initials",
		"team",
		"human player at amp",
		"starting position",
		"auto speaker notes scored",
		"auto amp notes scored",
		"left starting area",
		"teleop speaker notes scored",
		"teleop amp notes scored",
		"note pickup location",
		"coopertition",
		"trap note scored",
		"end position",
		"contributed to harmony",
		"high note",
		"yellow card",
		"red card",
		"offense skill",
		"defense skill",
		"total fouls",
		"died",
		"tipped over",
		"additional notes",
	];

	generateTable(keys);
}

function addToTable(newData) {
	

	// console.log(newData);
	let allKeys = [
		"match",
		"scouter initials",
		"team",
		"human player at amp",
		"starting position",
		"auto speaker notes scored",
		"auto amp notes scored",
		"left starting area",
		"teleop speaker notes scored",
		"teleop amp notes scored",
		"note pickup location",
		"coopertition",
		"trap note scored",
		"end position",
		"contributed to harmony",
		"high note",
		"yellow card",
		"red card",
		"offense skill",
		"defense skill",
		"total fouls",
		"died",
		"tipped over",
		"additional notes",
	];

	generateTable(newData);
}

function Export() {
	let data = JSON.parse(localStorage.getItem("Saved-Scanned"));

	let allKeys = [];

	for (i = 0; (imax = data.length), i < imax; i++) {
		keys = Object.keys(data[i]);
		for (v = 0; (vmax = keys.length), v < vmax; v++) {
			if (allKeys.indexOf(keys[v]) == -1) {
				allKeys.push(keys[v]);
			}
		}
	}

	let csv = [allKeys];

	for (i = 0; (imax = data.length), i < imax; i++) {
		let push = [];
		for (v = 0; (vmax = allKeys.length), v < vmax; v++) {
			if (allKeys[v] in data[i]) {
				push.push(data[i][allKeys[v]]);
			}
		}
		csv.push(push);
	}

	let file = arrayToCsv(csv);

	downloadBlob(file, "scouting_data.csv", "text/csv;charset=utf-8;");
}

document.getElementById("Export").addEventListener("click", Export);

function generateTable(data) {
	// console.log("Generated table");
	// creates a <table> element and a <tbody> element
	const tbl = document.getElementById("table");
	const tblBody = document.getElementById("table-body");

	// creating all cells
	// creates a table row
	const row = document.createElement("tr");

	for (let j = 0; j < data.length; j++) {
		// Create a <td> element and a text node, make the text
		// node the contents of the <td>, and put the <td> at
		// the end of the table row
		const cell = document.createElement("td");
		const cellText = document.createTextNode(data[j]);
		cell.appendChild(cellText);
		row.appendChild(cell);
	}

	// add the row to the end of the table body
	tblBody.appendChild(row);

	// put the <tbody> in the <table>
	tbl.appendChild(tblBody);
	// appends <table> into <body>
	document.body.appendChild(tbl);
	// sets the border attribute of tbl to '2'
	tbl.setAttribute("border", "2");
}
