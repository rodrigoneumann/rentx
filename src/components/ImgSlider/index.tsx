import React, { useState, useRef } from 'react';
import { FlatList, ViewToken} from 'react-native';

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

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImgSlider({imagesUrl}: Props){
  const [imageIndex, setImageIndex] = useState(0);


  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImgIndexes>
        { imagesUrl.map((_, index) => (
          <ImgIndex 
            key={index}
            active={index === imageIndex}/>
        ))
        }
      </ImgIndexes>

        <FlatList 
          data={imagesUrl}
          keyExtractor={key => key}
          renderItem={({ item }) => (
            <CarImgWrapper>
              <CarImg
                source={{ uri: item}}
                resizeMode="contain"
              />
            </CarImgWrapper>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChanged.current}
        />


    </Container>
  );
}