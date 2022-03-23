import React from 'react';
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg'

import { Car } from '../../components/Car';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList
} from './styles';

export function Home(){
  const carData = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      price: 40,
      period: 'per day',
    },
    thumbnail: 'https://esquilo.io/png/thumb/tOZhZK8Na6Txjt1-Audi-RS5-Red-PNG.png'
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
        renderItem={({ item }) => <Car data={ carData }/>}
      />

    </Container>
  );
}