import React, { useState } from 'react';
import { 
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import api from '../../../services/api';
import { useTheme } from 'styled-components';


import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';
import { InputPassword } from '../../../components/InputPassword';
import { Button } from '../../../components/Button';

type Nav = {
  navigate: (value: string, {}) => void;
  goBack: () => void;
}

// type ScreenParams = RouteProp<AppRoutesParamList, "SignUpSecondStep">;
// type navigationProps = NativeStackNavigationProp<AppRoutesParamList>;

export function SignUpSecondStep(){
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')

  const {
    params:  user ,
  } = useRoute();

  const navigation = useNavigation<Nav>();

  const theme = useTheme();

  function handleBack() {
    navigation.goBack()
  }

  async function handleRegister() {
    if(!password || !confirmPassword) {
      return Alert.alert('Fill in the password and password confirmation')
    }

    if(password != confirmPassword) {
      return Alert.alert('The passwords entered are different')
    }
    
    await api.post('/users', {
      // name: user.name,
      // email: user.email,
      // driver_license: user.driverLicense,
      password
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Register complete',
        message: `Now you can login and\n enjoy the rental platform`
      })
    }).catch(() => {
      Alert.alert('Error', 'Unable to complete your registration')
    });

  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet active/>
              <Bullet />
            </Steps>
          </Header>

          <Title>Create an account</Title>
          <SubTitle>Create your account and benefit from faster booking and pick-up processes</SubTitle>
        
          <Form>
            <FormTitle>2. Password</FormTitle>
            <InputPassword
              iconName='lock'
              placeholder='Password'
              onChangeText={setPassword}
              value={password}
            />
            <InputPassword
              iconName='lock'
              placeholder='Confirm Password'
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />

          </Form>

          <Button 
            title='Confirm'
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}