import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components'

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter'
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo'

import { CarDetails } from './src/screens/CarDetails';
import { ScheduleDetails } from './src/screens/ScheduleDetails';

import theme from './src/styles/theme';

export default function App() {
  const [fontLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  if(!fontLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}> 
      <ScheduleDetails />
    </ThemeProvider>
  );
}