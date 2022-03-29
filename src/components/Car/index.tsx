import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { CarDTO } from '../../dtos/CarDTO'

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

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

interface Props extends RectButtonProps {
  data: CarDTO;
}

export function Car({ data, ...rest } : Props){
  const MotorIcon = getAccessoryIcon(data.fuel_type)

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`£${data.rent.price}`}</Price>
          </Rent>

          <FuelType>
            <MotorIcon />
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