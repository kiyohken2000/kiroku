const apiKey = 'AIzaSyCzAX6St6SUnKBIeKITeNhpCUZlxj44ZWE'
const sheetId = '15OtDRuaSXWhZ8odAHi0E7Pn93hzvO3gvDIYSpopNngY'
const sheetName = 'sheet1'
// 'https://docs.google.com/spreadsheets/d/1aBGaKwO8AVmGWTV8YQmn-NYz6tOGg06e9mUoMMuNHrc/edit?usp=sharing

const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?valueRenderOption=FORMATTED_VALUE&key=${apiKey}`

const storageKey = {
  user: 'user',
  code: 'code'
}

export { dataUrl, storageKey }