import * as LocalAuthentication from "expo-local-authentication";
import * as Device from 'expo-device';

const biometricStatus = async() => {
  const isAuth = await LocalAuthentication.hasHardwareAsync()
  const savedBiometrics = await LocalAuthentication.isEnrolledAsync()
  console.log('デバイスが生体認証を利用できる', isAuth)
  console.log('デバイスに生体認証情報が保存されている', savedBiometrics)
  if(!isAuth || !savedBiometrics) {
    return false
  } else {
    return true
  }
}

const handleBiometricAuth = async() => {
  const biometricAuth = await LocalAuthentication.authenticateAsync({
    promptMessage: '生体情報で認証',
    cancelLabel: 'キャンセル',
    disableDeviceFallback: false
  })
  return biometricAuth
}

export { biometricStatus, handleBiometricAuth }