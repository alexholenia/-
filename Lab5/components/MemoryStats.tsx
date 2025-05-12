import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as FileSystem from 'expo-file-system'

const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    const units = ['KB', 'MB', 'GB', 'TB']
    let i = -1
    do {
        bytes /= 1024
        i++
    } while (bytes >= 1024 && i < units.length - 1)
    return `${bytes.toFixed(1)} ${units[i]}`
}

const StorageStats = () => {
    const [total, setTotal] = useState<number | null>(null)
    const [free, setFree] = useState<number | null>(null)

    useEffect(() => {
        const fetchStats = async () => {
            const totalCap = await FileSystem.getTotalDiskCapacityAsync()
            const freeCap = await FileSystem.getFreeDiskStorageAsync()
            setTotal(totalCap)
            setFree(freeCap)
        }
        fetchStats()
    }, [])

    if (total === null || free === null) {
        return <Text>Завантаження статистики памʼяті...</Text>
    }

    const used = total - free

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📊 Статистика памʼяті:</Text>
            <Text>Загальний обсяг: {formatBytes(total)}</Text>
            <Text>Зайнято: {formatBytes(used)}</Text>
            <Text>Вільно: {formatBytes(free)}</Text>
        </View>
    )
}

export default StorageStats

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        padding: 12,
        backgroundColor: '#78529e',
        borderRadius: 8
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 4,
        fontSize: 16
    }
})
