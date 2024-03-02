# How to use the scouting site


This README file will give you a rough understanding as to how the site works and how to use it to gather data.

There are 2 pages in the scouting site that are used for gathering and reading data.

## https://test2220.github.io/scout/scouter


This page is used for collecting data from matches. After each match, finalize the data from that match and press the 'Submit' button at the bottom of the page.

A QR code will be generated and can be scanned by a scouting scanner using their device.

## https://test2220.github.io/scout/scanner


This page is used to scan QR codes that are created on the scout-client page.

The diagram below briefly explains the process of collecting data. For more information, keep reading.

![Scout App Data Management Diagram](https://github.com/Test2220/scout-client/assets/87047924/190dd059-6396-40c4-bd1b-5d8006e88f82)

QR codes are scanned by the qr code scanner using their device and this page. Data is placed into a JSON object and saved to an array on the scanner's device.

When you are done scouting, or whenever you want the data, you can export the data using the 'Export' button at the bottom of the page, and all data will be cycled through and placed into a .csv file. The csv file will automatically be downloaded and saved as 'scouting-data.csv'. After the file has been downloaded, send it to whoever is managing the entire scouting process.

The manager will then take each csv file and open them into their own google sheet or other sheet software. After this, go through each sheet and copy the data from it, and then go into a central sheet and paste the data there. Repeat with every other sheet file. In the central sheet file you should see all your scouting data.

---
The guide linked below helped us create the client to create QR codes.
https://medium.com/geekculture/few-ways-to-generate-qr-code-using-javascript-54b6b5220c4f

The guide linked below helped us create the scanner to scan QR codes.
https://www.geeksforgeeks.org/create-a-qr-code-scanner-or-reader-in-html-css-javascript/

This stack overflow comment helped us convert an array to a csv and download it.
https://stackoverflow.com/a/68146412
