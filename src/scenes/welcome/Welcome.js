import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { fontSize, colors } from "../../theme";
import ScreenTemplate from "../../components/ScreenTemplate";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import ShadowButton from "../../components/ShadowButton";

export default function Welcome() {
  const navigation = useNavigation()

  const onButtonPress = () => {
    navigation.navigate('Home')
  }

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <View style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.label}>性的記録同意アプリ</Text>
          <Text style={styles.title}>キロク</Text>
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
  }
})