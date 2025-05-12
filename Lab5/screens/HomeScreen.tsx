import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import * as FileSystem from 'expo-file-system'
import { ROOT_DIR } from '../constants/constants'
import CreateModal from '../components/CreateModal'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'
import MemoryStats from '../components/MemoryStats'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>

const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp>()

    const [currentPath, setCurrentPath] = useState(ROOT_DIR)
    const [modalVisible, setModalVisible] = useState(false)
    const [items, setItems] = useState<string[]>([])

    useEffect(() => {
        const init = async () => {
            const dirInfo = await FileSystem.getInfoAsync(ROOT_DIR)
            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(ROOT_DIR, { intermediates: true })
            }
            await loadDirectory(ROOT_DIR)
        }
        init()
    }, [])

    const loadDirectory = async (path: string) => {
        try {
            const files = await FileSystem.readDirectoryAsync(path)
            setItems(files)
            setCurrentPath(path)
        } catch (err) {
            console.error('Помилка при зчитуванні директорії:', err)
        }
    }

    const enterFolder = async (name: string) => {
        const newPath = currentPath + name
        const info = await FileSystem.getInfoAsync(newPath)
        if (info.isDirectory) {
            loadDirectory(newPath + '/')
        } else if (name.endsWith('.txt')) {
            navigation.navigate('FileViewer', { path: newPath })
        } else {
            console.log('Непідтримуваний файл:', name)
        }
    }

    const goBack = () => {
        if (currentPath === ROOT_DIR) return
        const parts = currentPath.slice(ROOT_DIR.length).split('/').filter(Boolean)
        parts.pop()
        const newPath = ROOT_DIR + parts.join('/') + (parts.length ? '/' : '')
        loadDirectory(newPath)
    }

    const createFolder = async (name: string) => {
        const path = currentPath + name
        await FileSystem.makeDirectoryAsync(path, { intermediates: true })
        await loadDirectory(currentPath)
    }

    const createFile = async (name: string, content: string) => {
        const fileName = name.endsWith('.txt') ? name : name + '.txt'
        const path = currentPath + fileName
        await FileSystem.writeAsStringAsync(path, content)
        await loadDirectory(currentPath)
    }

    const confirmDelete = async (name: string) => {
        const path = currentPath + name
        const info = await FileSystem.getInfoAsync(path)
        Alert.alert(
            'Підтвердження видалення',
            `Ви впевнені, що хочете видалити ${info.isDirectory ? 'папку' : 'файл'} "${name}"?`,
            [
                { text: 'Скасувати', style: 'cancel' },
                {
                    text: 'Видалити',
                    style: 'destructive',
                    onPress: () => handleDelete(info)
                }
            ]
        )
    }

    const handleDelete = async (item: FileSystem.FileInfo) => {
        try {
            await FileSystem.deleteAsync(item.uri, { idempotent: true })
            loadDirectory(currentPath)
        } catch (e) {
            console.error('Помилка при видаленні:', e)
            Alert.alert('Помилка', 'Не вдалося видалити файл або папку.')
        }
    }

    const showFileInfo = async (name: string) => {
        const filePath = currentPath + name
        const fileInfo = await FileSystem.getInfoAsync(filePath)

        if (fileInfo.exists) {
            Alert.alert(
                'Info',
                `Name: ${name}\nType: ${fileInfo.isDirectory ? 'Directory' : `${name.split('.').pop()}`}\nSize: ${(
                    fileInfo.size / 1024
                ).toFixed(2)} KB\nLast Modified: ${new Date(fileInfo.modificationTime).toLocaleString()}`,
                [{ text: 'OK' }]
            )
        } else {
            Alert.alert('Error', 'File not found.')
        }
    }

    const renderItem = ({ item }: { item: string }) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => enterFolder(item)} style={{ flex: 1 }}>
                    <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmDelete(item)}>
                    <Text style={styles.deleteButton}>🗑️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => showFileInfo(item)}>
                    <Text style={styles.infoButton}>ℹ️</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.breadcrumb}>Шлях: {currentPath.replace(ROOT_DIR, '/')}</Text>
            {currentPath !== ROOT_DIR && (
                <TouchableOpacity onPress={goBack} style={styles.upBtn}>
                    <Text style={styles.upBtnText}>⬆ Назад</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.createBtn}>
                <Text style={styles.createBtnText}>Створити +</Text>
            </TouchableOpacity>

            <FlatList data={items} keyExtractor={(item) => item} renderItem={renderItem} />

            <CreateModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCreateFolder={createFolder}
                onCreateFile={createFile}
            />

            <MemoryStats />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#b83bb6'},
    breadcrumb: { marginBottom: 8, fontWeight: 'bold' },
    upBtn: { marginBottom: 12 },
    upBtnText: { color: 'blue' },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    itemText: { fontSize: 16 },
    createBtn: { backgroundColor: '#0c0c0d', padding: 10, marginBottom: 10, borderRadius: 5 },
    createBtnText: { color: '#fff', textAlign: 'center' },
    deleteButton: { color: 'red', fontSize: 18, paddingHorizontal: 8 },
    infoButton: { fontSize: 18 }
})
