import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CarouselComponent from './CarouselComponent';
import MostImportantTitle from '../../ObjectComponents/ObjectButtonGroupContainer/MostImportantDumb/MostImportantTitle';
type State = {
  width: number,
  height: number,
}
class CarouselContainer extends React.Component<State> {
  render() {
    return (
      <View style={{width: responsiveWidth(100),height: responsiveHeight(46), flexDirection: 'column'}}>
        <MostImportantTitle 
          title="Skoro viđeno"
        />
        <CarouselComponent />
      </View>
    );
  }
}

export default CarouselContainer;
