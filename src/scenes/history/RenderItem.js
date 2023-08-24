import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, fontSize } from "../../theme";
import Divider from "../../components/Divider";
import { formatDate } from "./functions";
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import RenderDetail from "./RenderDetail";

export default function RenderItem(props) {
  const { myCode, id, latitude, longitude, date, timestamp } = props.item
  const [visible, setVisible] = useState(false)

  const onItemPress = () => {
    setVisible(!visible)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.innerContainer}
        onPress={onItemPress}
      >
        <View style={{flex: 1}}>
          <FontIcon
            name={visible?"chevron-down":"chevron-right"}
            size={20}
            color={colors.graySecondary}
          />
        </View>
        <View style={{flex: 3, alignItems: 'flex-end'}}>
          <Text style={styles.label}>{formatDate({date})}</Text>
        </View>
      </TouchableOpacity>
      {visible?
        <View style={styles.detailContainer}>
          <RenderDetail
            myCode={myCode}
            id={id}
            latitude={latitude}
            longitude={longitude}
            date={date}
            timestamp={timestamp}
          />
        </View>
        :null
      }
      <Divider/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  innerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row'
  },
  label: {
    fontSize: fontSize.xxLarge,
    color: colors.graySecondary,
    fontWeight: '700',
  },
  detailContainer: {
    paddingBottom: 20
  }
})