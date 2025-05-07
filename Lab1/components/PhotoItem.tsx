import { Image, StyleSheet, View, Dimensions } from 'react-native'

type PhotoItemProps = {
  photo: string
}

const screenWidth = Dimensions.get('window').width
const itemMargin = 8
const numColumns = 2
const itemWidth = (screenWidth - itemMargin * (numColumns + 1)) / numColumns

export default function PhotoItem({ photo }: PhotoItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    margin: itemMargin,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#949191',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: itemWidth * 0.75, // співвідношення сторін 4:3
    resizeMode: 'cover',
  },
})