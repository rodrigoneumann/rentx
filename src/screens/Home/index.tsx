import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'

import { useTheme } from 'styled-components';

import api from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'

import Logo from '../../assets/logo.svg'

import { Load } from '../../components/Load';
import { Car } from '../../components/Car';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton,
} from './styles';

type Nav = {
  navigate: (value: string, {}) => void;
}

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<Nav>();

  const theme = useTheme()

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars', {})
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');
        setCars(response.data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    }
    fetchCars()
  }, [])
    
  
  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>        
          <Logo width={RFValue(108)} height={12}/>
          <TotalCars>
            12 cars listed
          </TotalCars>
        </HeaderContent>
      </Header>
      {loading ? <Load /> : 
      <CarList 
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({ item }) => 
          <Car data={ item } onPress={() => handleCarDetails(item)}/>}
      />}

      <MyCarsButton onPress={() => handleOpenMyCars()}>
        <Ionicons 
          name='ios-car-sport'
          size={32}
          color={theme.colors.shape}
        />
      </MyCarsButton>
    </Container>
  );
}