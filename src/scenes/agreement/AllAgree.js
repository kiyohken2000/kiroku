import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import RenderTitle from "./RenderTitle";
import ShadowButton from "../../components/ShadowButton";
import { colors } from "../../theme";
import RenderCode from "./RenderCode";

export default function AllAgree(props) {
  const { data, onAgreePress, isShowCode, onShowCodePress, location, qrcodeValue, setQrcodeValue } = props

  if(isShowCode) {
    return (
      <RenderCode
        location={location}
        qrcodeValue={qrcodeValue}
        setQrcodeValue={setQrcodeValue}
      />
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {data.map((item, i) => {
          const { index, title } = item
          return (
            <View key={i} style={styles.contentContainer}>
              <RenderTitle index={index} title={title} />
            </View>
          )
        })}
      </ScrollView>
      <ShadowButton
        label='確認を完了する'
        onPress={onShowCodePress}
        color={colors.graySecondary}
        labelColor={colors.white}
      />
      <View style={{paddingVertical: 10}} />
      <ShadowButton
        label='ひとつ前に戻る'
        onPress={() => onAgreePress({num: -1})}
        color={colors.white}
        labelColor={colors.graySecondary}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  }
})