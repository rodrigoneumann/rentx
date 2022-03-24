import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native'

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'
import { ConfirmButton } from '../../components/ConfirmButton';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';

type Nav = {
  navigate: (value: string) => void;
}

export function ScheduleCompleted(){
  const { width } = useWindowDimensions();
  const navigation = useNavigation<Nav>();

  function handleReturnHome(){
    navigation.navigate('Home')
  }

  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        translucent
        backgroundColor='transparent'
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Vehicle reservation {'\n'}completed!</Title>

        <Message>Now you just have to go to {'\n'}the chosen store to sign the rental{'\n'} agreement and pick up the vehicle.</Message>
      </Content>

      <Footer>
        <ConfirmButton title='OK' onPress={handleReturnHome}/>
      </Footer>
    </Container>
  );
}