import React from 'react';

import { useTheme } from 'styled-components';

import {
  Container,
  Title
} from './styles';

interface Props {
    title: string;
    color?:string;
    onPress: () => void;
}

export function Button({
    title,
    ...rest
}: Props){
  return (
    <Container {...rest}>
        <Title>{title}</Title>
    </Container>
  );
}