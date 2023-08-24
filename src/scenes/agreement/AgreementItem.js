import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { fontSize, colors } from "../../theme";
import RenderTitle from "./RenderTitle";
import RenderContent from "./RenderContent";
import ShadowButton from "../../components/ShadowButton";

export default function AgreementItem(props) {
  const { currentData, onAgreePress, stepCount } = props
  const { index, title, content } = currentData

  return (
    <View style={styles.container}>
      <View style={{flex: 0.5, justifyContent: 'center'}}>
        <RenderTitle index={index} title={title} />
      </View>
      <View style={{flex: 3, paddingVertical: 20}}>
        <RenderContent content={content} />
      </View>
      <View style={{flex: 1.5, justifyContent: 'space-around' }}>
        <ShadowButton
          label='上記について同意しました'
          onPress={() => onAgreePress({num: 1})}
          color={colors.graySecondary}
          labelColor={colors.white}
        />
        {stepCount >= 1?
          <ShadowButton
            label='戻る'
            onPress={() => onAgreePress({num: -1})}
            color={colors.white}
            labelColor={colors.graySecondary}
          />
          :null
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  }
})