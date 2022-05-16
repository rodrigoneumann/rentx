import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Schedule } from "../screens/Schedule";
import { ScheduleDetails } from "../screens/ScheduleDetails";
import { Confirmation } from "../screens/Confirmation";
import { MyCars } from "../screens/MyCars";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      >
      <Screen
        name="Home" 
        component={Home} 
        options={{
          gestureEnabled:false
        }}
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
        name="Confirmation" 
        component={Confirmation} 
      />
      <Screen 
        name="MyCars" 
        component={MyCars} 
      />
    </Navigator>
  );
}