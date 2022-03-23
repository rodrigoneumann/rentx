import React from 'react';

import GasolineSvg from '../../assets/gasoline.svg'

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Period,
  Price,
  Rent,
  FuelType,
  CarImg
} from './styles';

interface CarData {
  brand: string;
  name: string;
  rent: {
    price: number;
    period: string;
  }
  thumbnail: string;
}

interface Props {
  data: CarData
}

export function Car({ data } : Props){
  return (
    <Container>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`£${data.rent.price}`}</Price>
          </Rent>

          <FuelType>
            <GasolineSvg />
          </FuelType>
        </About>
      </Details>

      <CarImg 
        source={{ uri: data.thumbnail }} 
        resizeMode="contain"  
      />
    </Container>
  );
}