import React from 'react';
import { useTheme } from 'styled-components';
import { ImgSlider } from '../../components/ImgSlider'
import { BackButton } from '../../components/BackButton';
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button';

import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

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
  Accessories,
  Footer,
  CalendarIcon,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles';

export function ScheduleDetails(){
  const theme = useTheme();

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

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>FROM</DateTitle>
            <DateValue>23/03/2022</DateValue>
          </DateInfo>

          <Feather 
              name='chevron-right'
              size={RFValue(10)}
              color={theme.colors.text}
            />

          <DateInfo>
            <DateTitle>TO</DateTitle>
            <DateValue>24/03/2022</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>£80.00 x 3 days</RentalPriceQuota>
            <RentalPriceTotal>£240.00</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>

      </Content>

      <Footer>
        <Button color={'red'} title="Confirm"/>
      </Footer>
    </Container>
  );
}