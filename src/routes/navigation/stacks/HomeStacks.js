import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { navigationProps } from './navigationProps/navigationProps'

import Home from '../../../scenes/home/Home'
import Welcome from '../../../scenes/welcome/Welcome'
import Agreement from '../../../scenes/agreement/Agreement'
import History from '../../../scenes/history/History'
import Scan from '../../../scenes/scan/Scan'
import HistoryDetail from '../../../scenes/historyDetail/HistoryDetail'

const Stack = createStackNavigator()

export const HomeStacks = () => {
  
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={navigationProps}
    >
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={({ navigation }) => ({
          title: 'Welcome',
          headerShown: false,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: 'メニュー',
          headerShown: true,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="Agreement"
        component={Agreement}
        options={({ navigation }) => ({
          title: `同意確認をする`,
          headerShown: false,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={({ navigation }) => ({
          title: `同意履歴`,
          headerShown: true,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="Scan"
        component={Scan}
        options={({ navigation }) => ({
          title: 'QRコード読み取り',
          headerShown: true,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false
        }}
      >
        <Stack.Screen
          name="HistoryDetail"
          component={HistoryDetail}
          options={({ navigation }) => ({
            title: '詳細',
            headerBackTitleVisible: false,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}