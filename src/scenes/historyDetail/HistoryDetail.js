import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import ScreenTemplate from "../../components/ScreenTemplate";
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomButton from "../../components/BottomButton";
import { storage } from "../../utils/storage";
import RenderItem from "./RenderItem";

export default function HistoryDetail() {
  const navigation = useNavigation()
  const routes = useRoute()
  const { timestamp } = routes.params
  const [ data, setData ] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const loadData = async() => {
      try {
        setIsError(false)
        setIsLoading(true)
        const res = await storage.load({key: `${timestamp}`})
        if(!res) return
        setData(res)
      } catch(e) {
        console.log('load data error', e)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const onBackPress = () => {
    navigation.goBack()
  }

  return (
    <ScreenTemplate isLoading={isLoading} isError={isError} >
      <View style={styles.container}>
        <View style={{flex: 6}}>
          <ScrollView>
            {data.map((item, i) => {
              return (
                <RenderItem
                  key={i}
                  item={item}
                />
              )
            })}
            <View style={{paddingVertical: 40}} />
          </ScrollView>
        </View>
        <View style={{flex: 1}}>
          <BottomButton
            onPress={onBackPress}
            label='戻る'
          />
        </View>
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})