import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'

import Logo from '../../assets/logo.svg'

import { LoadAnimation } from '../../components/LoadAnimation';
import { Car } from '../../components/Car';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
} from './styles';

type Nav = {
  navigate: (value: string, {}) => void;
}

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<Nav>();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
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
          { !loading &&
            <TotalCars>
              {cars.length} cars listed
            </TotalCars>
          }
        </HeaderContent>
      </Header>
      {loading ? <LoadAnimation /> : 
      <CarList 
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({ item }) => 
          <Car data={ item } onPress={() => handleCarDetails(item)}/>}
      />}
    </Container>
  );
}
