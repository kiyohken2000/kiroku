import { storageKey } from "../../config";
import { storage } from "../../utils/storage";
import moment from "moment";

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

export { loadStorage, formatDate }