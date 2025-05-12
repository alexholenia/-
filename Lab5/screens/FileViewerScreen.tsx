import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Button, Alert } from 'react-native'
import * as FileSystem from 'expo-file-system'
import { RouteProp, useRoute } from '@react-navigation/native'

type ParamList = {
    FileViewer: {
        path: string
    }
}

export default function FileViewerScreen() {
    const route = useRoute<RouteProp<ParamList, 'FileViewer'>>()
    const { path } = route.params

    const [content, setContent] = useState<string>('')
    const [originalContent, setOriginalContent] = useState<string>('')
    const [editing, setEditing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadFile = async () => {
            try {
                const data = await FileSystem.readAsStringAsync(path)
                setContent(data)
                setOriginalContent(data)
            } catch (e) {
                console.error('Не вдалося зчитати файл:', e)
                setError('Помилка зчитування файлу')
            }
        }

        loadFile()
    }, [path])

    const handleSave = async () => {
        try {
            await FileSystem.writeAsStringAsync(path, content)
            setOriginalContent(content)
            setEditing(false)
            Alert.alert('Збережено', 'Файл успішно оновлено.')
        } catch (e) {
            console.error('Не вдалося зберегти файл:', e)
            Alert.alert('Помилка', 'Не вдалося зберегти файл.')
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.path}>Файл: {path.split('/').pop()}</Text>

            {error ? (
                <Text style={styles.error}>{error}</Text>
            ) : editing ? (
                <>
                    <TextInput
                        style={styles.input}
                        multiline
                        value={content}
                        onChangeText={setContent}
                        textAlignVertical='top'
                    />
                    <Button title='💾 Зберегти' onPress={handleSave} />
                </>
            ) : (
                <>
                    <Text style={styles.content}>{content || '[Порожній файл]'}</Text>
                    <Button title='✏️ Редагувати' onPress={() => setEditing(true)} />
                </>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    path: { marginBottom: 12, fontWeight: 'bold' },
    content: { fontSize: 16, marginBottom: 16 },
    input: {
        fontSize: 16,
        padding: 10,
        backgroundColor: '#c359cf',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        minHeight: 200,
        borderRadius: 6
    },
    error: { color: 'red' }
})
