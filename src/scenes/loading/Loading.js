import React, { useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { authenticate } from 'slices/app.slice'
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { UserContext } from '../../contexts/UserContext';
import { fontSize } from 'theme'
import { loadUser, removeData, getAppMode } from './functions';

export default function Loading() {
  const dispatch = useDispatch()
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    initialize()
  }, [])

  const initialize = async() => {
    //await removeData()
    const uuid = await loadUser()
    const isReviewMode = await getAppMode()
    const user = {
      id: uuid,
      userName: 'abcdef(not use)',
      isReviewMode,
    }
    setUser(user)
    dispatch(authenticate({ loggedIn: true, checked: true }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Loaging</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: fontSize.xxxLarge,
    fontWeight: '700'
  }
})