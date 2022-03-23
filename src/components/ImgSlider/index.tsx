import React from 'react';

import {
  Container,
  ImgIndexes,
  ImgIndex,
  CarImgWrapper,
  CarImg,
} from './styles';

interface Props {
  imagesUrl: string[];
}

export function ImgSlider({imagesUrl}: Props){
  return (
    <Container>
      <ImgIndexes>
        <ImgIndex active={true}/>
        <ImgIndex active={false}/>
        <ImgIndex active={false}/>
        <ImgIndex active={false}/>
      </ImgIndexes>

      <CarImgWrapper>
        <CarImg
          source={{ uri: imagesUrl[0]}}
          resizeMode="contain"
        />
      </CarImgWrapper>

    </Container>
  );
}