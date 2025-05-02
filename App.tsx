import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Home from './src/views/Home/Home';
import Schedule from './src/views/Schedule/ScheduleStack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName: string = 'help';

                if(route.name === 'Home'){
                    iconName = focused ? 'home' : 'home-outline';
                } else if(route.name === 'Schedule'){
                    iconName = focused ? 'calendar' : 'calendar-outline';
                }else if(route.name === 'Profile'){
                    iconName = focused ? 'happy' : 'happy-outline';
                }else if(route.name === 'Social'){
                    iconName = focused ? 'people' : 'people-outline';
                }
                return <Ionicons name={iconName as any} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name='Home' component={Home} />
          <Tab.Screen name='Schedule' component={Schedule} />
        </Tab.Navigator>  
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
