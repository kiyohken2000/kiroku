import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Image, Alert } from "react-native";
import ScreenTemplate from '../../components/ScreenTemplate'
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BarCodeScanner } from 'expo-barcode-scanner'
import { fontSize, colors } from "../../theme";
import { parseParams } from "./functions";
import { showToast } from "../../utils/showToast";

export default function Scan() {
  const navigation = useNavigation()
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const infoText = '相手の' + '\n' + 'QRコードを読み込んでください。';

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
    setScanned(true)
    const result = await parseParams({data})
    if(!result) {
      invalidCode({message: '有効なQRコードではありません。'})
    } else {
      showToast({title: '保存しました'})
      setScanned(false)
      navigation.goBack()
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
              <Text style={styles.infoText}>{infoText}</Text>
            </View>
          </BarCodeScanner>
          :null
        }
      </View>
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