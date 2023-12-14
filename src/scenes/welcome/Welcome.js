import React, { useContext } from "react";
import { View, StyleSheet, Text, Image, Dimensions, Platform } from "react-native";
import { fontSize, colors } from "../../theme";
import ScreenTemplate from "../../components/ScreenTemplate";
import { useNavigation } from "@react-navigation/native";
import ShadowButton from "../../components/ShadowButton";
import { UserContext } from "../../contexts/UserContext";
import { version } from "../../config";

const { height, width } = Dimensions.get('window')
const imageSource = Platform.select({
  ios: require('../../../assets/images/logo-sm-iphone.png'),
  android: require('../../../assets/images/logo-sm.png')
})
const appName = Platform.select({
  ios: 'ドウイ',
  android: 'Kiroku'
})

export default function Welcome() {
  const navigation = useNavigation()
  const { user } = useContext(UserContext)
  const { isReviewMode } = user
  const consentWord = isReviewMode?'積極的同意サポートアプリ':'性的同意アプリ'

  const onButtonPress = () => {
    navigation.navigate('Home')
  }

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <View style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{alignItems: 'center', paddingBottom: 30}}>
            <Text style={styles.label}>{consentWord}</Text>
            <Text style={styles.title}>{appName}</Text>
          </View>
          <Image
            source={imageSource}
            resizeMode='contain'
            style={styles.image}
          />
        </View>
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <ShadowButton
            label='始める'
            onPress={onButtonPress}
            color={colors.graySecondary}
            labelColor={colors.white}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.label}>version. {version}</Text>
        </View>
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  label: {
    fontSize: fontSize.large
  },
  title: {
    fontSize: fontSize.xxxLarge,
    fontWeight: '700'
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 10
  },
  footer: {
    alignItems: 'center'
  }
})