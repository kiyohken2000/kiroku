import React from "react";
import { View, StyleSheet } from "react-native";
import RenderContent from "../agreement/RenderContent";
import RenderTitle from "../agreement/RenderTitle";

export default function RenderItem(props) {
  const { index, title, content } = props.item

  return (
    <View style={styles.container}>
      <View style={{paddingVertical: 10}}>
        <RenderTitle index={index} title={title} />
      </View>
      <RenderContent content={content} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  }
})