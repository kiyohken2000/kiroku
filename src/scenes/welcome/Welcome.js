import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { fontSize, colors } from "../../theme";
import ScreenTemplate from "../../components/ScreenTemplate";
import { useNavigation } from "@react-navigation/native";
import ShadowButton from "../../components/ShadowButton";
import LegalNotes from "../../components/LegalNotes";

const { height, width } = Dimensions.get('window')

export default function Welcome() {
  const navigation = useNavigation()

  const onButtonPress = () => {
    navigation.navigate('Home')
  }

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <View style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{alignItems: 'center', paddingBottom: 30}}>
            <Text style={styles.label}>性的同意記録アプリ</Text>
            <Text style={styles.title}>Kiroku</Text>
          </View>
          <Image
            source={require('../../../assets/images/logo-sm.png')}
            resizeMode='contain'
            style={styles.image}
          />
          <LegalNotes/>
        </View>
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <ShadowButton
            label='始める'
            onPress={onButtonPress}
            color={colors.graySecondary}
            labelColor={colors.white}
          />
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
  }
})