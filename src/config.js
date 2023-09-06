const apiKey = 'AIzaSyCzAX6St6SUnKBIeKITeNhpCUZlxj44ZWE'
const sheetId = '15OtDRuaSXWhZ8odAHi0E7Pn93hzvO3gvDIYSpopNngY'
const sheetName = 'sheet1'
const appSettingsSheetName = 'sheet2'

const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?valueRenderOption=FORMATTED_VALUE&key=${apiKey}`
const appSettingsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${appSettingsSheetName}?valueRenderOption=FORMATTED_VALUE&key=${apiKey}`

const storageKey = {
  user: 'user',
  code: 'code'
}

export { dataUrl, storageKey, appSettingsUrl }