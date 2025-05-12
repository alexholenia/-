import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ClickerScreen from '../screens/ClickerScreen'
import TasksScreen from '../screens/TasksScreen'
import { RootStackParamList } from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Clicker' component={ClickerScreen} options={{title:"Клікер", 
            headerStyle: {
            backgroundColor: '#293a57',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
            <Stack.Screen name='Tasks' component={TasksScreen} options={{title:"Завдання",   
            headerStyle: {
            backgroundColor: '#293a57',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}/>
        </Stack.Navigator>
    )
}
