import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import DrawerNavigator from './drawer'
import RootStack from './rootStack/RootStack'
import Toast from 'react-native-toast-message'
import * as Notifications from 'expo-notifications'
import { fetchData } from '../../scenes/scan/functions'
import { storeCode } from '../../scenes/agreement/functions'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default () => {

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      const saveData = async() => {
        const { latitude, longitude, id, date, timestamp } = notification.request.content.data
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
      }
      saveData()
    });
    return () => subscription.remove();
  }, []);

  return (
    <>
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
    <Toast />
    </>
  )
}
