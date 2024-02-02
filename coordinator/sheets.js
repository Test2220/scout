import { express } from '../node_modules/@types/express/index.js';
import { google } from '../node_modules/googleapis/build/src/index.js';

const app = express()


	console.log('Hello world')
    auth = new google.auth.GoogleAuth({
		keyFile: 'keys.json',
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
    
    client = await auth.getClient()
    console.log("client" + client)

    googleSheets = google.sheets({ version: "v4", auth: client })
    console.log("googleSheets" + googleSheets)

	spreadsheetId = '14h_mJ6Y2aCh06k1WqHcwK-xZQ2GZ4JbNEQ835QD2WEc'

	metaData = await googleSheets.spreadsheets.get({
		auth,
		spreadsheetId
    })

    export async function sendRows() {
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet1",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    ["2220", "EK"]
                ]
            }
        })
    }



