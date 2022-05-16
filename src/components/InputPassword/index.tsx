import React, { useState } from 'react';
import { TextInputProps } from 'react-native';

import { BorderlessButton } from 'react-native-gesture-handler';

import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons'

import {
  Container,
  InputText,
  IconContainer,
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'],
  value?: string;
}

export function InputPassword({
  iconName,
  value,
  ...rest
}: Props){

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme()

  function handlePasswordVisibility() {
    setIsPasswordVisible( prevState => !prevState);
  }

  function handleInputFocus() {
    setIsFocused(true)
  }
  
  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!value);
  }

  return (
    <Container >
      <IconContainer isFocused={isFocused}>
        <Feather 
          name={iconName}
          size={24}

          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
          />
      </IconContainer>

      <InputText
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={isPasswordVisible}
        isFocused={isFocused}
      />

      <BorderlessButton onPress={handlePasswordVisibility}>
        <IconContainer isFocused={isFocused}
>
          <Feather 
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={24}
              color={theme.colors.text_detail}
            />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}