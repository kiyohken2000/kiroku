import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { colors, fontSize } from "../../theme";
import QRCode from 'react-native-qrcode-svg';
import { UserContext } from "../../contexts/UserContext";
import { generateQRcode } from "./functions";
import { getPushToken } from "../../utils/notificationsFunctions";

const { height, width } = Dimensions.get('window')

export default function RenderCode(props) {
  const { location, qrcodeValue, setQrcodeValue } = props
  const { user } = useContext(UserContext)

  useEffect(() => {
    const generateCode = async() => {
      const token = await getPushToken()
      const codeValue = generateQRcode({user, location, token})
      setQrcodeValue(codeValue)
    }
    generateCode()
  }, [location, user])

  if(!qrcodeValue) {
    return <View/>
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>QRコードを</Text>
        <Text style={styles.label}>相手に読み込んでもらってください</Text>
        <View style={{paddingVertical: 5}} />
        <Text style={styles.label}>「同意を完了する」を押すと</Text>
        <Text style={styles.label}>内容が保存されます</Text>
      </View>
      <QRCode
        value={qrcodeValue}
        size={width * 0.7}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelContainer: {
    paddingBottom: 30,
    alignItems: 'center',
  },
  label: {
    fontSize: fontSize.xxLarge,
    fontWeight: '700'
  }
})