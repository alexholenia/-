import { StyleSheet, View, Text } from 'react-native'

export default function Footer() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Holenia Oleksandr, IPZk-23-1</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        backgroundColor: '#949191',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        alignItems: 'center'
    },
    text: {
        color: '#555',
        fontSize: 14,
        fontStyle: 'italic'
    }
})
