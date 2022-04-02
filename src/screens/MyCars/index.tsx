import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons'

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate
} from './styles';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars(){
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=1');
        
        setCars(response.data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }

    fetchCars();
  }, [])

  function handleBack() {
    navigation.goBack()
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
          Here are your reservations
        </Title>

        <SubTitle>
          Comfort, Safety and Ease
        </SubTitle>
      </Header>

      { loading ? <Load /> : 
        <Content>
          <Appointments>
            <AppointmentsTitle>Appointments Confirmed</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList 
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <CarWrapper>
                <Car data={item.car}/>
                <CarFooter>
                  <CarFooterTitle>Period</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign 
                      name='arrowright'
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10}}
                      />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      }
    </Container>
  );
}