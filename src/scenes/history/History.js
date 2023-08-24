import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ScreenTemplate from "../../components/ScreenTemplate";
import BottomButton from "../../components/BottomButton";
import { useNavigation } from "@react-navigation/native";
import { loadStorage } from "./functions";
import RenderItem from "./RenderItem";

export default function History() {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    const loadData = async() => {
      try {
        setIsError(false)
        setIsLoading(true)
        const res = await loadStorage()
        setData(res)
      } catch(e) {
        console.log(e)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const onGobackHome = () => {
    navigation.navigate('Home')
  }

  return (
    <ScreenTemplate isLoading={isLoading} isError={isError} isEmpty={data.length === 0} >
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
          </ScrollView>
        </View>
        <View style={{flex: 1}}>
          <BottomButton
            onPress={onGobackHome}
            label='メニューに戻る'
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