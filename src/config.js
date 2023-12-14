import { Platform } from "react-native"

const apiKey = 'AIzaSyCzAX6St6SUnKBIeKITeNhpCUZlxj44ZWE'
const sheetId = '15OtDRuaSXWhZ8odAHi0E7Pn93hzvO3gvDIYSpopNngY'
const sheetName = Platform.select({
  ios: 'sheet1',
  android: 'sheet3'
})
const appSettingsSheetName = 'sheet2'

const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?valueRenderOption=FORMATTED_VALUE&key=${apiKey}`
const appSettingsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${appSettingsSheetName}?valueRenderOption=FORMATTED_VALUE&key=${apiKey}`

const storageKey = {
  user: 'user',
  code: 'code'
}

const expoSettings = {
  slug: 'kiroku',
  projectId: '77c0224b-a231-42c7-bff8-b404fd952586'
}

const version = '1.0.1'

export { dataUrl, storageKey, appSettingsUrl, expoSettings, version }