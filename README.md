# How to use the scouting site

### The site is fully functional for online use

## To do
- [ ] Smaller qr codes, optimizing the JSON or using arrays instead
- [ ] More reliable scanning, some qr codes would be scanned and give random 8-12 digit numbers instead of the data on the qr code
- [ ] Export as pure JSON button and function. If a qr code was mis-scanned and gave a random 8-12 digit number, the export button would break. The export JSON button would be a backup solution
- [ ] Documentation on Activepieces connection between google drive and google sheets
- [ ] Guide for how to set up the scouting site on your own repository and vercel site
- [ ] Updated README.md (this document) with images and diagrams to understand the site easier
- [ ] Functional check boxes

This README file will give you a rough understanding as to how the site works and how to use it to gather data.

There are 2 pages in the scouting site that are used for gathering and reading data.

## https://test2220.github.io/scout/scouter

The scouting page is made up of 5 sections:

1. Pre-Match
2. Auto
3. Teleop
4. Endgame
5. Postmatch

In pre-match, you enter the match number, robot number, and scouter initials.

In auto, you enter the scores for your robot during the autonomous period. The same goes for teleop.

In endgame, you enter the robot's performance during the endgame, if they hung on the chain, scored a trap note, and so on.

In postmatch, you enter additional notes, red and yellow cards if they had any, and rate their performance.

After you scout a match, generate a qr code at the bottom of the page, and after the qr code is scanned by a scanner, you can clear all fields using the 'clear' button at the bottom.

## https://test2220.github.io/scout/scanner

The scanner page as a qr code scanner on it, and you need to allow camera permissions for it to work.

When you scan a qr code, the outside of the scanner will flash green, letting you know a qr code has been scanned. The qr codes that are generated have a lot of information on them, so they will be relatively large. You will need to make the qr code as big as you can, and try to get it as close to the camera as you can. 

In our experience, we found that our phones are not great at scanning qr codes, so we used laptops, but we also had issues with that, as only one of us was able to scan qr codes with our laptop.

When you scan qr codes, the results are saved locally on your device. You can export the results as a csv using the export button at the bottom of the page, and you can clear local storage using the clear data button. 

After that, it is up to you as to how you use your scouting results. 

For us at Team 2220, we set up an Activepieces flow where we can upload a csv to a folder in our team google drive, and the csv will be taken and have all of it's data put into a google sheet for viewing.

---
The guide linked below helped us create the client to create QR codes.
https://medium.com/geekculture/few-ways-to-generate-qr-code-using-javascript-54b6b5220c4f

The guide linked below helped us create the scanner to scan QR codes.
https://www.geeksforgeeks.org/create-a-qr-code-scanner-or-reader-in-html-css-javascript/

This stack overflow comment helped us convert an array to a csv and download it.
https://stackoverflow.com/a/68146412
