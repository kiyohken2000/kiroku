import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import Button from '../../components/Button'
import { colors, fontSize } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import ScreenTemplate from '../../components/ScreenTemplate'
import AgreementButton from './AgreementButton'
import ShadowButton from '../../components/ShadowButton'
import BottomButton from '../../components/BottomButton'
import { UserContext } from '../../contexts/UserContext'

const { height, width } = Dimensions.get('window')

export default function Home() {
  const navigation = useNavigation()
  const { user } = useContext(UserContext)

  const onGoAgreementPress = () => {
    navigation.navigate('Agreement')
  }

  const onHistoryPress = () => {
    navigation.navigate('History')
  }

  const onScanPress = () => {
    navigation.navigate('Scan')
  }
  
  return (
    <ScreenTemplate>
      <View style={styles.root}>
        <View style={{flex: 6, alignItems: 'center', justifyContent: 'center', width: width * 0.8, alignSelf: 'center' }}>
          <AgreementButton
            onPress={onGoAgreementPress}
          />
          <View style={{paddingVertical: 20}} />
          <ShadowButton
            onPress={onHistoryPress}
            label='同意履歴を見る'
            color={colors.white}
            labelColor={colors.graySecondary}
          />
          <View style={{paddingVertical: 20}} />
          <ShadowButton
            onPress={onScanPress}
            label='スキャンする'
            color={colors.white}
            labelColor={colors.graySecondary}
          />
        </View>
        <View style={{flex: 1}}>
          <BottomButton
            onPress={onGoAgreementPress}
            label='同意確認をする'
          />
        </View>
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bottomButton: {
    flex: 1,
    backgroundColor: colors.graySecondary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomButtonLabel: {
    fontSize: fontSize.xxxLarge,
    fontWeight: '700',
    color: colors.white
  }
})
