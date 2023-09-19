import { storage } from "../../utils/storage";
import uuid from 'react-native-uuid';
import { storageKey } from "../../config";
import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";
import axios from "axios";
import { appSettingsUrl } from "../../config";
import { formatData } from "../agreement/functions";

const loadUser = async() => {
  try {
    const res = await storage.load({key: storageKey.user})
    return res
  } catch(e) {
    console.log('user data empty')
    const res = await createUser()
    return res
  }
}

const createUser = async() => {
  const deviceId = await createId()
  await storage.save({key: storageKey.user, data: deviceId})
  return deviceId
}

const createId = async() => {
  if(Platform.OS === 'ios') {
    const id = await DeviceInfo.getUniqueId()
    return id
  } else {
    const id = uuid.v4()
    return id
  }
}

const removeData = async() => {
  await storage.remove({key: storageKey.code})
}

const getAppMode = async() => {
  const isAndroid = Platform.OS === 'android'
  if(isAndroid) return false
  const res = await fetchAppSettings()
  return res
}

const fetchAppSettings = async() => {
  try {
    const { data } = await axios.get(appSettingsUrl)
    const res = formatData({data})
    const { nowReview } = res[0]
    console.log({nowReview})
    const mode = Number(nowReview)
    if(mode === 1) {
      return true
    } else {
      return false
    }
  } catch(e) {
    console.log('fetchAppSettings error', e)
    return false
  }
}

export { loadUser, removeData, getAppMode }