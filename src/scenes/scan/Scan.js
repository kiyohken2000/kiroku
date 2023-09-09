import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Image, Alert, Platform } from "react-native";
import ScreenTemplate from '../../components/ScreenTemplate'
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BarCodeScanner } from 'expo-barcode-scanner'
import { fontSize, colors } from "../../theme";
import { parseParams, getPushTokenFromQRcode } from "./functions";
import { showToast } from "../../utils/showToast";
import { getLocation } from "../agreement/functions";
import { sendNotification, getPushToken } from "../../utils/notificationsFunctions";
import Spinner from 'react-native-loading-spinner-overlay';
import { UserContext } from "../../contexts/UserContext";

const isIOS = Platform.OS === 'ios'

export default function Scan() {
  const navigation = useNavigation()
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const infoText = '相手の' + '\n' + 'QRコードを読み取ってください';
  const { user } = useContext(UserContext)

  useFocusEffect(() => {
    setScanned(false)
  });

  useEffect(() => { // カメラパーミッションを取得
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async({ type, data }) => {
    try {
      setScanned(true)
      const result = await parseParams({data})
      if(!result) return invalidCode({message: '有効なQRコードではありません。'})
      const {date, timestamp, token} = getPushTokenFromQRcode({data})
      if(token) {
        setIsLoading(true)
        const {latitude, longitude} = await getLocation()
        const response = await sendNotification({
          title: 'QRコードがスキャンされました',
          body: '',
          token: token,
          data: {
            latitude,
            longitude,
            id: user.id,
            date,
            timestamp
          }
        })
        console.log(response)
        setIsLoading(false)
      }
      showToast({title: '保存しました'})
      setScanned(false)
      navigation.goBack()
    } catch(e) {
      console.log('handleBarCodeScanned error', e)
    }
  }

  const invalidCode = ({message}) => {
    Alert.alert(
      message,
      '',
      [
        {text: 'OK', onPress: () => setScanned(false)},
      ],
      { cancelable: false }
    )
  }

  if (hasPermission === null || hasPermission === false) { // パーミッション取得まで表示しておく待機メッセージ
    return (
      <ScreenTemplate>
        <View style={styles.container}>
          <Text style={styles.label}>カメラの使用を許可してください</Text>
        </View>
      </ScreenTemplate>
    )
  }

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        {!scanned?
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.scan}
          >
            <View style={styles.overlay}>
              <Image
                source={require('../../../assets/images/elements/scan-frame.png')}
                style={styles.image}
                resizeMode='contain'
              />
              {isIOS?
                <Text style={styles.infoText}>{infoText}</Text>
                :null
              }
            </View>
          </BarCodeScanner>
          :null
        }
      </View>
      <Spinner
        visible={isLoading}
        textContent=""
        color={colors.graySecondary}
        overlayColor={colors.overlayColor}
      />
    </ScreenTemplate>
  )
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scan: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: fontSize.large,
    color: colors.white,
    textAlign: 'center',
  },
  label: {
    fontSize: fontSize.large
  },
  image: {
    height: width * 0.5,
    width: width * 0.5
  }
})