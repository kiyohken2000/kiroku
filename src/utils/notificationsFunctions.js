import axios from "axios";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { expoSettings } from "../config";

const sendNotification = async({title, body, token, data}) => {
  const response = await axios.post(
    'https://exp.host/--/api/v2/push/send',
    {
      to: token,
      title: title,
      body: body,
      data: data
    },
    {headers: {'Content-Type': 'application/json'}}
  )
  const { status } = response
  return status
}

const getPushToken = async() => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return ''
    }
    token = (await Notifications.getExpoPushTokenAsync({ projectId: expoSettings.projectId })).data;
  } else {
    console.log('シミュレーターはプッシュ通知トークン非対応')
    return ''
  }
  return token;
}

export { sendNotification, getPushToken }