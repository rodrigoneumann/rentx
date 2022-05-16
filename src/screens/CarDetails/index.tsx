import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ImgSlider } from '../../components/ImgSlider'
import { BackButton } from '../../components/BackButton';
import { Accessory } from '../../components/Accessory'
import { Button } from '../../components/Button';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import {getAccessoryIcon} from '../../utils/getAccessoryIcon'

import { CarDTO } from '../../dtos/CarDTO';
import 
  Animated, 
  {  
    event,
    Extrapolate,
    interpolate, 
    useAnimatedScrollHandler, 
    useAnimatedStyle, 
    useSharedValue 
  } from 'react-native-reanimated';

import {
  Container,
  Header,
  CarImages,
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

  const theme = useTheme();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
    console.log(event.contentOffset.y);
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 15],
        [1, 0],
        Extrapolate.CLAMP
      ),
    }
  })

  function handleConfirmRental(){
    navigation.navigate('Schedule', { car })
  }

  function handleBack() {
    navigation.goBack()
  }

  return (
    <Container>
      <StatusBar 
        barStyle='dark-content'
        translucent
        backgroundColor='transparent'
      />

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          {backgroundColor: theme.colors.background_secondary,}
        ]}
      >
        <Header>
          <BackButton onPress={handleBack} />
        </Header>
        
        <Animated.View style={sliderCarsStyleAnimation}>
          <CarImages>
            <ImgSlider 
              imagesUrl={car.photos}
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 180,
          alignItems: 'center' 
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>£{car.price}.00</Price>
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
        <About>{car.about}</About>
        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button title="Confirm" onPress={handleConfirmRental}/>
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  }
})