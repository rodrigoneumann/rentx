import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ImgSlider } from '../../components/ImgSlider'
import { BackButton } from '../../components/BackButton';
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg'
import accelerationSvg from '../../assets/acceleration.svg'
import forceSvg from '../../assets/force.svg'
import gasolineSvg from '../../assets/gasoline.svg'
import exchangeSvg from '../../assets/exchange.svg'
import peopleSvg from '../../assets/people.svg'

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

type Nav = {
  navigate: (value: string) => void;
}

export function CarDetails(){
  const navigation = useNavigation<Nav>();

  function handleConfirmRental(){
    navigation.navigate('Schedule')
  }
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}}/>
      </Header>
      
      <CarImages>
        <ImgSlider 
          imagesUrl={['https://esquilo.io/png/thumb/tOZhZK8Na6Txjt1-Audi-RS5-Red-PNG.png']}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Audi</Brand>
            <Name>R5</Name>
          </Description>
          <Rent>
            <Period>a day</Period>
            <Price>£80</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name='380km/h' icon={speedSvg}/>
          <Accessory name='3.2s' icon={accelerationSvg}/>
          <Accessory name='800 HP' icon={forceSvg}/>
          <Accessory name='Gasoline' icon={gasolineSvg}/>
          <Accessory name='Auto' icon={exchangeSvg}/>
          <Accessory name='4 people' icon={peopleSvg}/>
        </Accessories>
        <About>
            This is a sport car. It emerged from the legendary bull fighting pardoned in the Plaza Real Maestranza de Sevilla. It is a beautiful car for those who like to accelerate.
        </About>
      </Content>

      <Footer>
        <Button title="Confirm" onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
}