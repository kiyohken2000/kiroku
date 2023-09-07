import React, { useContext } from "react";
import { View, TouchableOpacity, Text, Dimensions, StyleSheet } from "react-native";
import { fontSize, colors } from "../../theme";
import { UserContext } from "../../contexts/UserContext";

const { height, width } = Dimensions.get('window')

export default function AgreementButton(props) {
  const { onPress } = props
  const { user } = useContext(UserContext)
  const { isReviewMode } = user
  const consentWord = isReviewMode?'賛成':'同意'

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.label}>{consentWord}確認をする</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: width * 0.8,
    width: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    fontSize: fontSize.xxxLarge,
    fontWeight: '700',
    color: colors.graySecondary
  }
})