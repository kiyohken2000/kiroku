import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, fontSize } from "../theme";

export default function ShadowButton(props) {
  const { label, onPress, color, labelColor } = props

  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}]}
      onPress={onPress}
    >
      <Text style={[styles.label, {color: labelColor}]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
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