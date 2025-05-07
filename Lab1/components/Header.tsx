import { View, Image, Text, StyleSheet } from 'react-native'

export default function Header() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/favicon.png')} style={styles.logo} resizeMode='contain' />
            <Text style={styles.title}>Перший мобільний застосунок</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#949191'
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 12
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})
