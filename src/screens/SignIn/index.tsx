import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';

import { 
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { useTheme } from 'styled-components';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Footer,
  Form
} from './styles';


type Nav = {
  navigate: (value: string) => void;
}

export function SignIn(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  const theme = useTheme();
  const navigation = useNavigation<Nav>();

  async function handleSignIn() {

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
        .required('E-mail is required')
        .email('Provide a valid e-mail'),
        password: Yup.string()
        .required('Password is required')
      });

      await schema.validate({email, password});

      signIn({ email, password});
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert('Ops', error.message)
      } else {
        Alert.alert(
          'Authentication error',
          'Please check your credentials'
          )
      }
    } 
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep')
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar 
            barStyle='dark-content'
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>
              Almost there
            </Title>
            <SubTitle>
              Log in to access the best vehicle {`\n`}rental platform.
            </SubTitle>
          </Header>

          <Form>
            <Input 
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setEmail}
              value={email}
            />
            <InputPassword 
              iconName='lock'
              placeholder='Password'
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
              <Button 
                onPress={handleSignIn}
                title='Login'
                loading={false}
                enabled={true}
              />
              <Button 
                onPress={handleNewAccount}
                title='Create a free account'
                color={theme.colors.shape}
                loading={false}
                enabled={true}
                light
              />
            </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}