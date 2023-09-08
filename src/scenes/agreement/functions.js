import * as Location from 'expo-location';
import { dummyLocation } from './data';
import moment from 'moment';
import { storage } from '../../utils/storage';
import { storageKey } from '../../config';

const formatData = ({data}) => {
  const keys = data.values[0];
  const _data = data.values.slice(1);
  const obj = _data.map(arr => Object.assign({}, ...keys.map((k, i) => ({ [k]: arr[i] }))));
  return obj
}

const getLocation = async() => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return dummyLocation
  }
  let location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords
  return {latitude, longitude}
}

const generateQRcode = ({user, location, token}) => {
  const { id } = user
  const { latitude, longitude } = location
  const date = moment().format('YYYY-MM-DD HH:mm:ss')
  const data = {
    myCode: true,
    id,
    latitude,
    longitude,
    date,
    timestamp: moment().unix(),
    token,
  }
  const response = JSON.stringify(data)
  return response
}

const storeCode = async({qrcodeValue, data}) => {
  const currentData = await loadData()
  const newData = [...currentData, qrcodeValue]
  console.log('storeCode save')
  await storage.save({key: storageKey.code, data: newData})
  await saveAgreement({data, qrcodeValue})
}

const saveAgreement = async({data, qrcodeValue}) => {
  const { timestamp } = JSON.parse(qrcodeValue)
  console.log('saveAgreement save')
  if(!data) return
  await storage.save({key: `${timestamp}`, data: data})
}

const loadData = async() => {
  try {
    const response = await storage.load({key: storageKey.code})
    return response
  } catch(e) {
    return []
  }
}

export { formatData, getLocation, generateQRcode, storeCode }