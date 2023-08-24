import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { fontSize, colors } from "../../theme";

export default function RenderContent(props) {
  const { content } = props

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>{content}</Text>
      <View style={{paddingVertical: 40}} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.graySecondary,
    padding: 20,
  },
  label: {
    fontSize: fontSize.xxLarge,
    color: colors.graySecondary,
    fontWeight: '500'
  }
})