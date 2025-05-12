import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { Gesture, GestureDetector, MouseButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'
import { interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'react-native-linear-gradient'
import { useTaskContext } from '../context/TaskContext'

const INITIAL_SIZE = 100
const PADDING = 20

export default function ClickerScreen() {
    const [layout, setLayout] = useState({ width: 0, height: 0 })

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const insets = useSafeAreaInsets()

    const { progress, setProgress } = useTaskContext()

    const circleSize = useSharedValue(INITIAL_SIZE)
    const startCircleSize = useSharedValue(0)
    const offsetX = useSharedValue(0)
    const offsetY = useSharedValue(0)
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)

    const clamp = (value: number, min: number, max: number) => {
        return Math.min(Math.max(value, min), max)
    }

    const animatedStyle = useAnimatedStyle(() => ({
        width: circleSize.value,
        height: circleSize.value,
        borderRadius: circleSize.value / 2,
        transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }]
    }))

    const tap = Gesture.Tap()
        .numberOfTaps(1)
        .onEnd(() => {
            setProgress((prev) => ({ ...prev, clicks: prev.clicks + 1, score: prev.score + 1 }))
        })
        .runOnJS(true)

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            setProgress((prev) => ({ ...prev, doubleClicks: prev.doubleClicks + 1, score: prev.score + 2 }))
        })
        .runOnJS(true)

    const longPress = Gesture.LongPress()
        .minDuration(3000)
        .onStart(() => {
            setProgress((prev) => ({ ...prev, longPressed: true, score: prev.score + 5 }))
        })
        .runOnJS(true)

    const pan = Gesture.Pan()
        .minPointers(1)
        .maxPointers(1)
        .onUpdate((e) => {
            const maxX = layout.width / 2 - circleSize.value / 2 - PADDING
            const maxY = layout.height / 2 - circleSize.value / 2 - PADDING

            const rawX = translateX.value + e.translationX
            const rawY = translateY.value + e.translationY

            const elasticX = interpolate(
                rawX,
                [-maxX - 50, -maxX, maxX, maxX + 50],
                [-maxX - 20, -maxX, maxX, maxX + 20]
            )
            const elasticY = interpolate(
                rawY,
                [-maxY - 50, -maxY, maxY, maxY + 50],
                [-maxY - 20, -maxY, maxY, maxY + 20]
            )

            offsetX.value = elasticX
            offsetY.value = elasticY
        })
        .onEnd(() => {
            const maxX = layout.width / 2 - circleSize.value / 2 - PADDING
            const maxY = layout.height / 2 - circleSize.value / 2 - PADDING

            offsetX.value = withSpring(clamp(offsetX.value, -maxX, maxX))
            offsetY.value = withSpring(clamp(offsetY.value, -maxY, maxY))

            translateX.value = offsetX.value
            translateY.value = offsetY.value

            setProgress((prev) => ({ ...prev, dragged: true }))
        })
        .runOnJS(true)

    const flingRight = Gesture.Fling()
        .direction(MouseButton.RIGHT)
        .onEnd(() => {
            let score = Math.floor(Math.random() * 10)
            setProgress((prev) => ({ ...prev, swipeRight: true, score: prev.score + score }))
        })
        .runOnJS(true)

    const flingLeft = Gesture.Fling()
        .direction(MouseButton.LEFT)
        .onEnd(() => {
            let score = Math.floor(Math.random() * 10)
            setProgress((prev) => ({ ...prev, swipeLeft: true, score: prev.score + score }))
        })
        .runOnJS(true)

    const pinch = Gesture.Pinch()
        .onStart((e) => {
            startCircleSize.value = circleSize.value
        })
        .onUpdate((e) => {
            const newSize = clamp(startCircleSize.value * e.scale, 50, Math.min(layout.width, layout.height))
            circleSize.value = withTiming(newSize, { duration: 5 })
            setProgress((prev) => ({ ...prev, sizeChanged: true }))
        })
        .runOnJS(true)

    const tapGroup = Gesture.Exclusive(doubleTap, tap)
    const movementGestures = Gesture.Race(pan, pinch)
    const flingGestures = Gesture.Simultaneous(flingRight, flingLeft)
    const gesturesInOrder = Gesture.Exclusive(flingGestures, movementGestures)
    const composedGesture = Gesture.Simultaneous(tapGroup, gesturesInOrder, longPress)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button title='Завдання' onPress={() => navigation.navigate('Tasks')} />
        })
    }, [navigation])

    return (
        <View
            onLayout={(e) => {
                const { width, height } = e.nativeEvent.layout
                setLayout({ width, height })
            }}
            style={{
                backgroundColor: '#5a7094',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: insets.top,
                paddingBottom: insets.bottom
            }}
        >
            <Text style={styles.score}>Кліки: {progress.score}</Text>
            {layout.height > 0 && (
                <GestureDetector gesture={composedGesture}>
                    <Animated.View style={[styles.circle, animatedStyle]} />
                </GestureDetector>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    score: {
        position: 'absolute',
        top: 10,
        zIndex: 1000,
        fontSize: 36,
        fontWeight: 'bold',
        color: '#0bded7',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5
    },
    circle: {
        backgroundColor: '#0bded7',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10
    }
})
