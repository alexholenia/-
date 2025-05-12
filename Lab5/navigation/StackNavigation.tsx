import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import FileViewerScreen from '../screens/FileViewerScreen'
import { RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

const StackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Головна', headerStyle: {
            backgroundColor: '#c39bcf',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, }}/>
        <Stack.Screen name='FileViewer' component={FileViewerScreen} options={{ title: 'Файл' }} />
    </Stack.Navigator>
)

export default StackNavigator
