import { colors } from "../../../../theme"

const headerTintColor = colors.white
const fontSize = 18
const headerMode = 'float'

const navigationProps = {
  headerTintColor: headerTintColor,
  headerStyle: { 
    backgroundColor: colors.grayThird
  },
  headerTitleStyle: { fontSize: fontSize },
  headerMode: headerMode
}

export { navigationProps }