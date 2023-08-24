import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { colors, fontSize } from "../theme";

export default function BottomButton(props) {
  const { label, onPress } = props

  return (
    <TouchableOpacity
      style={styles.bottomButton}
      onPress={onPress}
    >
      <Text style={styles.bottomButtonLabel}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  bottomButton: {
    flex: 1,
    backgroundColor: colors.graySecondary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomButtonLabel: {
    fontSize: fontSize.xxxLarge,
    fontWeight: '700',
    color: colors.white
  }
})