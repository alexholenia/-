import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './navigation/RootNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TaskProvider } from './context/TaskContext'

export default function App() {
    return (
        <TaskProvider>
            <SafeAreaProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <NavigationContainer>
                        <RootNavigator />
                    </NavigationContainer>
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </TaskProvider>
    )
}
