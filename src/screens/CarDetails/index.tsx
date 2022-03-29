import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ImgSlider } from '../../components/ImgSlider'
import { BackButton } from '../../components/BackButton';
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button';

import {getAccessoryIcon} from '../../utils/getAccessoryIcon'


import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';

type Nav = {
  navigate: (value: string, {}) => void;
  goBack: () => void;
}

interface Params {
  car: CarDTO
}

export function CarDetails(){
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental(){
    navigation.navigate('Schedule', { car })
  }

  function handleBack() {
    navigation.goBack()
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack}/>
      </Header>
      
      <CarImages>
        <ImgSlider 
          imagesUrl={car.photos}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>£{car.rent.price}.00</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory 
                key={accessory.type}
                name={accessory.name} 
                icon={getAccessoryIcon(accessory.type)}/>
            ))
          }
          
        </Accessories>
        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button title="Confirm" onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
}