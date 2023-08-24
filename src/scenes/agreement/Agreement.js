import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors, fontSize } from "../../theme";
import ScreenTemplate from "../../components/ScreenTemplate";
import BottomButton from "../../components/BottomButton";
import { useNavigation } from "@react-navigation/native";
import StepCounter from "../../components/Steps/StepCounter";
import AgreementItem from "./AgreementItem";
import AllAgree from "./AllAgree";
import axios from "axios";
import { dataUrl } from "../../config";
import { formatData, getLocation, storeCode } from "./functions";
import { dummyData, dummyLocation } from "./data";
import Divider from "../../components/Divider";

export default function Agreement() {
  const navigation = useNavigation()
  const [stepCount, setStepCount] = useState(0)
  const [data, setData] = useState([])
  const [currentData, setCurrentData] = useState(dummyData[0])
  const [isAllAgree, setIsAllAgree] = useState(false)
  const [isShowCode, setIsShowCode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [location, setLocation] = useState(dummyLocation)
  const [qrcodeValue, setQrcodeValue] = useState('')

  useEffect(() => {
    const fetchData = async() => {
      try {
        setIsError(false)
        setIsLoading(true)
        const { data } = await axios.get(dataUrl)
        const _data = formatData({data})
        setData(_data)
        setCurrentData(_data[0])
      } catch(e) {
        console.log('error', e)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if(!data.length) return
    const nextData = data[stepCount]
    if(nextData) {
      setIsAllAgree(false)
      setCurrentData(data[stepCount])
    } else {
      setIsAllAgree(true)
    }
  }, [stepCount])

  const onGobackHome = () => {
    navigation.navigate('Home')
  }

  const onAgreePress = ({num}) => {
    setStepCount(prev => prev + num)
  }

  const onShowCodePress = async() => {
    setIsLoading(true)
    const location = await getLocation()
    setLocation(location)
    setIsShowCode(true)
    setIsLoading(false)
  }

  const onCompletePress = async() => {
    setIsLoading(true)
    await storeCode({qrcodeValue})
    setIsLoading(false)
    navigation.navigate('Home')
  }

  return (
    <ScreenTemplate isLoading={isLoading} isError={isError}>
      <View style={styles.container}>
        <View style={{flex: 6}}>
          <View style={styles.header}>
            <StepCounter
              position={stepCount}
              data={data}
            />
          </View>
          <Divider />
          {!isAllAgree?
            <View style={{flex: 1}}>
              <AgreementItem
                currentData={currentData}
                stepCount={stepCount}
                onAgreePress={onAgreePress}
              />
            </View>
            :
            <AllAgree
              data={data}
              onAgreePress={onAgreePress}
              isShowCode={isShowCode}
              onShowCodePress={onShowCodePress}
              location={location}
              qrcodeValue={qrcodeValue}
              setQrcodeValue={setQrcodeValue}
            />
          }
        </View>
        <View style={{flex: 1}}>
          {isShowCode?
            <BottomButton
              onPress={onCompletePress}
              label='同意を完了する'
            />:
            <BottomButton
              onPress={onGobackHome}
              label='メニューに戻る'
            />
          }
        </View>
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20
  },
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