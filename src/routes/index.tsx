import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Schedule } from '../screens/Schedule'
import { ScheduleCompleted } from '../screens/ScheduleCompleted'
import { ScheduleDetails } from '../screens/ScheduleDetails'
import { MyCars } from '../screens/MyCars';

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes(){
  return(
    <Navigator screenOptions={{headerShown:false}}>
      <Screen
        name="Home"
        component={Home} 
      />
      <Screen 
        name="CarDetails"
        component={CarDetails} 
      />
      <Screen
        name="Schedule"
        component={Schedule} 
      />
      <Screen
          name="ScheduleDetails"
          component={ScheduleDetails} 
      />
      <Screen
        name="ScheduleCompleted"
        component={ScheduleCompleted} 
      />
      <Screen
        name="MyCars"
        component={MyCars} 
      />
    </Navigator>
  )
}


