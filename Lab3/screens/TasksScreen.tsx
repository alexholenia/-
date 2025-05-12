import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useTaskContext } from '../context/TaskContext'

export default function TasksScreen() {
    const { progress } = useTaskContext()

    return (
        <View style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <TaskCard title='Кліки' value={progress.clicks} />
                <TaskCard title='Подвійні кліки' value={progress.doubleClicks} />
                <TaskCard title='Довге натискання' value={progress.longPressed ? 'Виконано' : 'Не виконано'} />
                <TaskCard title='Свайп вправо' value={progress.swipeRight ? 'Виконано' : 'Не виконано'} />
                <TaskCard title='Свайп вліво' value={progress.swipeLeft ? 'Виконано' : 'Не виконано'} />
                <TaskCard title='Зміна розміру' value={progress.sizeChanged ? 'Виконано' : 'Не виконано'} />
                <TaskCard title='Кліки' value={progress.score} />
            </ScrollView>
        </View>
    )
}

const TaskCard = ({ title, value }: { title: string; value: string | number }) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardText}>{value}</Text>
    </View>
)

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#1251c7',
        paddingTop: 60,
        paddingHorizontal: 20
    },
    scrollContainer: {
        paddingBottom: 40
    },
    card: {
        backgroundColor: '#7b96c7',
        borderRadius: 10,
        marginBottom: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#04235e',
        marginBottom: 8
    },
    cardText: {
        fontSize: 18,
        color: '#020c1f',
        fontWeight: 'bold'
    }
})
