import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { fontSize } from "../theme";

const isIOS = Platform.OS === 'ios'

export default function LegalNotes() {

  if(isIOS) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>※このアプリは性的パートナー間の{"\n"}同意を文書化することはできません</Text>
      </View>
    )
  }

  return (
    <View/>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10
  },
  label: {
    fontSize: fontSize.middle,
    textAlign: 'center'
  }
})