import { google } from 'googleapis';

export default async function handler(req, res) {
  const { sheet = 'FOOTBALL' } = req.query; // Default to FOOTBALL if no sheet specified

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const range = `${sheet}!A1:Z1000`;  // Use the sheet name in the range

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'No data found.' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error accessing Google Sheet:', error);
    res.status(500).json({ error: 'Error accessing Google Sheet' });
  }
}