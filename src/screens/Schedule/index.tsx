import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { format } from 'date-fns';
import { CarDTO } from '../../dtos/CarDTO';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { 
  Calendar,
  DayProps,
  generateInterval,
  MarkedDateProps
} from '../../components/Calendar';
import ArrowSvg from '../../assets/arrow.svg'

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';

type Nav = {
  navigate: (value: string, car:any) => void;
  goBack: () => void;
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO
}

export function Schedule(){
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({})
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
  
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental(){
    navigation.navigate('ScheduleDetails', {
      car,
      dates: Object.keys(markedDates)
    })
  }

  function handleBack() {
    navigation.goBack()
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp){
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length -1];

    setRentalPeriod({
      startFormatted: format(new Date(firstDate), 'dd/MM/yyyy'),
      endFormatted: format(new Date(endDate), 'dd/MM/yyyy')
    })
  }

  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        translucent 
        backgroundColor='transparent'
      />
      <Header>
        <BackButton 
          onPress={handleBack}
          color={theme.colors.shape}
        />

        <Title>
          Choose the rental start date
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>FROM</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>TO</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
            {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar 
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button 
          title='Confirm' 
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
}
