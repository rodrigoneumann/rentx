import React, { useState, useRef } from 'react';
import { FlatList, ViewToken} from 'react-native';
import { Bullet } from '../Bullet';

import {
  Container,
  ImgIndexes,
  CarImgWrapper,
  CarImg,
} from './styles';

interface Props {
  imagesUrl: {
    id: string;
    photo: string;
  }[];
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
        { imagesUrl.map((item, index) => (
          <Bullet
            key={String(item.id)}
            active={index === imageIndex}/>
        ))
        }
      </ImgIndexes>

        <FlatList 
          data={imagesUrl}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CarImgWrapper>
              <CarImg
                source={{ uri: item.photo}}
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