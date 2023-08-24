import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { colors, fontSize } from "../../theme";
import MapView, { Marker } from 'react-native-maps';

const { height, width } = Dimensions.get('window')

export default function RenderDetail(props) {
  const { myCode, id, latitude, longitude, date, timestamp } = props
  const description = `${myCode?'自分':'相手'}が同意した場所`

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
          description={description}
        />
      </MapView>
      <Text style={styles.id}>ID: {id}</Text>
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
    fontSize: fontSize.middle,
    color: colors.graySecondary
  }
})