import { storageKey } from "../../config";
import { storage } from "../../utils/storage";
import moment from "moment";
import { colors } from "../../theme";

const loadStorage = async() => {
  try {
    const res = await storage.load({key: storageKey.code})
    const data = res.map((item) => {
      return JSON.parse(item)
    })
    const result = sortData({data})
    return result
  } catch(e) {
    console.log('storage empty')
    return []
  }
}

const sortData = ({data}) => {
  const result = data.sort((a,b)=>{
    return b.timestamp - a.timestamp
   })
  return result
}

const formatDate = ({date}) => {
  const result = moment(date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')
  return result
}

const identifyUserAction = ({myCode, isScanned}) => {
  if(isScanned) {
    return {word: 'スキャンされた場所', icon: 'qrcode', color: colors.bluePrimary}
  } else if(myCode) {
    return {word: '自分が同意した場所', icon: 'user', color: colors.redPrimary}
  } else {
    return {word: '相手が同意した場所', icon: 'user-circle', color: colors.bluePrimary}
  }
}

export { loadStorage, formatDate, identifyUserAction }