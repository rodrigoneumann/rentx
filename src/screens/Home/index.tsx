import React from 'react';
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/logo.svg'

import { Car } from '../../components/Car';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList
} from './styles';

type Nav = {
  navigate: (value: string) => void;
}

export function Home(){
  const navigation = useNavigation<Nav>();

  const carData = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      price: 40,
      period: 'per day',
    },
    thumbnail: 'https://esquilo.io/png/thumb/tOZhZK8Na6Txjt1-Audi-RS5-Red-PNG.png'
  }

  function handleCarDetails() {
    navigation.navigate('CarDetails')
  }
  
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

      <CarList 
        data={[1,2,3, 4, 5, 6, 7]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => 
          <Car data={ carData } onPress={handleCarDetails}/>}
      />

    </Container>
  );
}