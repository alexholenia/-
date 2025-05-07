import { useState } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import LabelInput from '../components/LabelInput'

export default function ProfileScreen() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        lastName: '',
        firstName: ''
    })

    const handleChange = (key: keyof typeof form, value: string) => {
        setForm({ ...form, [key]: value })
    }

    const handleSubmit = () => {
        console.log('Submitted:', form)
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Реєстрація</Text>

            <LabelInput label='Пошта' value={form.email} onChangeText={(v) => handleChange('email', v)} />
            <LabelInput
                label='Пароль'
                value={form.password}
                secureTextEntry
                onChangeText={(v) => handleChange('password', v)}
            />
            <LabelInput
                label='Повторіть пароль'
                value={form.confirmPassword}
                secureTextEntry
                onChangeText={(v) => handleChange('confirmPassword', v)}
            />
            <LabelInput label='Прізвище' value={form.lastName} onChangeText={(v) => handleChange('lastName', v)} />
            <LabelInput label='Імя' value={form.firstName} onChangeText={(v) => handleChange('firstName', v)} />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Зареєструватись</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#949191',
        flexGrow: 1
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 20
    },
    button: {
        backgroundColor: '#75c786',
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '500',
        fontSize: 16
    }
})
