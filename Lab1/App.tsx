import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import HomeScreen from './screens/HomeScreen'
import GalleryScreen from './screens/GalleryScreen'
import ProfileScreen from './screens/ProfileScreen'
import { View } from 'react-native'
import Header from './components/Header'
import { FontAwesome } from '@expo/vector-icons'
import Footer from './components/Footer'

const Tab = createMaterialTopTabNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <View style={{ flex: 1 }}>
                <Header />
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color }) => {
                            let iconName: 'home' | 'image' | 'user' = 'home'

                            if (route.name === 'Головна') iconName = 'home'
                            if (route.name === 'Галерея') iconName = 'image'
                            if (route.name === 'Профіль') iconName = 'user'

                            return <FontAwesome name={iconName} size={20} color={color} />
                        },
                        tabBarActiveTintColor: 'blue',
                        tabBarInactiveTintColor: 'gray',
                        tabBarIndicatorStyle: {
                            backgroundColor: '#949191',
                            height: 0
                        },
                        tabBarStyle: {
                            
                            backgroundColor: 'rgba(34,36,40,1)',
                            
                            
                        },
                    })}
                >
                    <Tab.Screen name='Головна' component={HomeScreen} />
                    <Tab.Screen name='Галерея' component={GalleryScreen} />
                    <Tab.Screen name='Профіль' component={ProfileScreen} />
                </Tab.Navigator>
                <Footer />
            </View>
        </NavigationContainer>
    )
}
