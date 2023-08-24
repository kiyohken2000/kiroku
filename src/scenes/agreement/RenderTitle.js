import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { colors, fontSize } from "../../theme";

const { height, width } = Dimensions.get('window')

export default function RenderTitle(props) {
  const { index, title } = props

  return (
    <View style={styles.container}>
      <View style={styles.indexContainer}>
        <Text style={styles.index}>{index}</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  index: {
    fontSize: fontSize.xxxLarge,
    fontWeight: '700',
    color: colors.white
  },
  indexContainer: {
    backgroundColor: colors.graySecondary,
    borderRadius: 10,
    height: width * 0.15,
    width: width * 0.15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: fontSize.xxxLarge,
    fontWeight: '700',
    color: colors.graySecondary
  },
  titleContainer: {
    paddingLeft: 20
  }
})