import React from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';
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
  navigate: (value: string) => void;
}

export function Schedule(){
  const theme = useTheme();
  const navigation = useNavigation<Nav>();

  function handleConfirmRental(){
    navigation.navigate('ScheduleDetails')
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
          onPress={() => {}}
          color={theme.colors.shape}
        />

        <Title>
          Choose the rental start date
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>FROM</DateTitle>
            <DateValue selected={false}>
              21/03/2022
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>TO</DateTitle>
            <DateValue selected={false}>
              23/03/2022
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title='Confirm' onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
}