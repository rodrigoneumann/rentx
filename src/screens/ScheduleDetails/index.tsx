import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { ImgSlider } from '../../components/ImgSlider'
import { BackButton } from '../../components/BackButton';
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { format } from 'date-fns';

import api from '../../services/api';

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
import { Alert } from 'react-native';

type Nav = {
  navigate: (value: string, {}) => void;
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
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

  const theme = useTheme();
  const navigation = useNavigation<Nav>();

  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentalTotal = Number(dates.length * car.price);

  async function handleConfirmRental(){
      setLoading(true);

      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

      const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      ]

      api.put(`/schedules_bycars/${car.id}`, {
        id:car.id,
        unavailable_dates
      })
      .then(() => navigation.navigate('Confirmation', {
        nextScreenRoute: 'Home',
        title: 'Vehicle reservation completed',
        message: `Now you just have to go to\n the chosen store to sign the rental\n agreement and pick up the vehicle.`
      }))
      .catch(() => {
        setLoading(false);
        Alert.alert('Unable to complete reservation, please contact the branch.')
        
      })

      await api.post('schedules_byuser', {
        user_id: 1,
        car,
        startDate: format(new Date(dates[0]), 'dd/MM/yyyy'),
        endDate: format(new Date(dates[dates.length -1]), 'dd/MM/yyyy')
      })
    
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
            <Period>{car.period}</Period>
            <Price>{car.price}</Price>
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
            <RentalPriceQuota>{`£${car.price} x ${dates.length} days`}</RentalPriceQuota>
            <RentalPriceTotal>£{rentalTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>

      </Content>

      <Footer>
        <Button 
          title="Confirm reservation" 
          color={theme.colors.success} 
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}