import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../theme";

export default function Divider() {
  return (
    <View style={styles.divider} />
  )
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: colors.grayFifth,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  }
})