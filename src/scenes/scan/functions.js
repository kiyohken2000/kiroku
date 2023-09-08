import { storeCode } from "../agreement/functions"
import axios from "axios"
import { dataUrl } from "../../config"
import { formatData } from "../agreement/functions"
import { storage } from "../../utils/storage"

const parseParams = async({data}) => {
  try {
    const _data = JSON.parse(data)
    const { myCode, id, latitude, longitude, date, timestamp, token } = _data
    if (!id || !latitude || !longitude || !date || !timestamp) {
      return false
    } else {
      const data = {
        myCode: false,
        id,
        latitude,
        longitude,
        date,
        timestamp
      }
      const response = JSON.stringify(data)
      await storeCode({qrcodeValue: response})
      await fetchData({timestamp})
      return true
    }
  } catch(e) {
    return false
  }
}

const getPushTokenFromQRcode = ({data}) => {
  const _data = JSON.parse(data)
  const { myCode, id, latitude, longitude, date, timestamp, token } = _data
  return {date, timestamp, token}
}

const fetchData = async({timestamp}) => {
  try {
    const { data } = await axios.get(dataUrl)
    const _data = formatData({data})
    if(!_data) return false
    console.log('fetchData save')
    await storage.save({key: `${timestamp}`, data: _data})
  } catch(e) {
    throw new Error('fetch data error', e);
  }
}

export { parseParams, getPushTokenFromQRcode, fetchData }