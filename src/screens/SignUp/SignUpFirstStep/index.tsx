import React, { useState } from 'react';
import { 
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';

import * as Yup from 'yup';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';

import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

type Nav = {
  navigate: (value: string, {}) => void;
  goBack: () => void;
}

export function SignUpFirstStep(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('')


  const navigation = useNavigation<Nav>();

  function handleBack() {
    navigation.goBack()
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        drivingLicense: Yup.string()
          .required('Driving License number is required'),
        email: Yup.string()
          .email('Invalid E-mail')
          .required('Email is required'),
          name: Yup.string()
          .required('Name is required')
      })

      const data = {name, email, drivingLicense}
      await schema.validate(data)

      navigation.navigate('SignUpSecondStep', { user: data })
      
    } catch (error) {
      Alert.alert('Error', error.message)
    }

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
            <FormTitle>1. Data</FormTitle>
            <Input
              iconName='user'
              placeholder='Full Name'
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName='credit-card'
              placeholder='Driver License Number'
              keyboardType='numeric'
              onChangeText={setDrivingLicense}
              value={drivingLicense}
            />
          </Form>

          <Button 
            title='Next Step'
            onPress={handleNextStep}  
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}