import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import { colors, fontSize } from "../../theme";
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import ShadowButton from "../../components/ShadowButton";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";

const { height, width } = Dimensions.get('window')
const isAndroid = Platform.OS === 'android'

export default function RenderDetail(props) {
  const navigation = useNavigation()
  const { myCode, id, latitude, longitude, date, timestamp } = props
  const description = myCode?'自分':'相手'
  const { user } = useContext(UserContext)
  const { isReviewMode } = user

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
          description={`${description}が${isReviewMode?'賛成':'同意'}した場所`}
        />
      </MapView>
      <View style={{paddingVertical: 10}}>
        <Text style={styles.id}>{description}のID: {id}</Text>
      </View>
      <ShadowButton
        label='詳細'
        onPress={onDetailPress}
        color={colors.white}
        labelColor={colors.graySecondary}
      />
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