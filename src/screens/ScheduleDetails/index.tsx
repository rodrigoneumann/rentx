import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { ImgSlider } from '../../components/ImgSlider'
import { BackButton } from '../../components/BackButton';
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { format } from 'date-fns';

import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

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

type Nav = {
  navigate: (value: string) => void;
  goBack: () => void;
}

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function ScheduleDetails(){
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  const theme = useTheme();
  const navigation = useNavigation<Nav>();

  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentalTotal = Number(dates.length * car.rent.price);

  function handleConfirmRental(){
    navigation.navigate('ScheduleCompleted')
  }

  function handleBack() {
    navigation.goBack()
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(new Date(dates[0]), 'dd/MM/yyyy'),
      end: format(new Date(dates[dates.length -1]), 'dd/MM/yyyy')
    })
  }, [])

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
            <Price>{car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          { car.accessories.map(accessory => 
             <Accessory 
              key={accessory.type}
              name={accessory.name} 
              icon={getAccessoryIcon(accessory.type)}/>
          )}
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
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather 
              name='chevron-right'
              size={RFValue(10)}
              color={theme.colors.text}
            />

          <DateInfo>
            <DateTitle>TO</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`£${car.rent.price} x ${dates.length} days`}</RentalPriceQuota>
            <RentalPriceTotal>£${rentalTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>

      </Content>

      <Footer>
        <Button title="Confirm reservation" color={theme.colors.success} onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
}