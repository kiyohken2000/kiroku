import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import { colors, fontSize } from "../../theme";
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import ShadowButton from "../../components/ShadowButton";
import { useNavigation } from "@react-navigation/native";
import { identifyUserAction } from "./functions";
import { UserContext } from "../../contexts/UserContext";

const { height, width } = Dimensions.get('window')
const isAndroid = Platform.OS === 'android'

export default function RenderDetail(props) {
  const navigation = useNavigation()
  const { myCode, id, latitude, longitude, date, timestamp, isScanned } = props
  const description = myCode?'自分':'相手'
  const { icon, color, word } = identifyUserAction({myCode, isScanned})
  const { user } = useContext(UserContext)

  const onDetailPress = () => {
    navigation.navigate('HistoryDetail', { timestamp })
  }

  return (
    <View styles={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.03, //小さくなるほどズーム
          longitudeDelta: 0.03,
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={date}
          description={word}
          pinColor={myCode?'red':'blue'}
        />
      </MapView>
      <View style={{paddingVertical: 10}}>
        <Text style={styles.id}>{description}のID: {id}</Text>
      </View>
      {!user.isReviewMode?
        <ShadowButton
          label='詳細'
          onPress={onDetailPress}
          color={colors.white}
          labelColor={colors.graySecondary}
        />
        :null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  map: {
    width: width * 0.9,
    height: width * 0.9,
  },
  id: {
    fontSize: fontSize.small,
    color: colors.graySecondary
  }
})