import { storeCode } from "../agreement/functions"

const parseParams = async({data}) => {
  try {
    const _data = JSON.parse(data)
    const { myCode, id, latitude, longitude, date, timestamp } = _data
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
      return true
    }
  } catch(e) {
    return false
  }
}

export { parseParams }