import React from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import WorkingTimes from './WorkingTimes';
import ObjectClockMain from '../../ObjectComponentDumb/ObjectClockMain';
import WorkTimeCalendarContainer from './WorkTimeCalendarContainer';
import MonthAndDay from './MonthAndDay';
import MostImportantTitle from './MostImportantTitle';
import TextFont from 'TextFont';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

const style = StyleSheet.create({
  cont: { 
    justifyContent: "center",
    alignItems: "flex-start",
  },
  clock: {
    paddingTop: 10,
  },
  fontView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  wrapper: {
    display: 'flex',
    backgroundColor: 'transparent',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});

const WorkingTimeSection = ({ objectCl }) => (
  <View style={style.cont}>
    <MostImportantTitle title="Radno vreme" />
    <View style={{ width: '100%', height: 190, backgroundColor: 'white', justifyContent: 'space-between', flexDirection: 'row' }}>
      <View style={{ flexDirection: 'column', width: '65%', backgroundColor: 'white'}}>
        <WorkingTimes alo={objectCl.workingTimeInfo} sectorInfo={objectCl.sectorTimeInfo} />
      </View>
      <View style={{ flexDirection: 'column', width: '35%', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
        <ObjectClockMain
          isWorking={objectCl.workingTimeInfo.isWorking}
          styleContainer={style.clock}
        />
        <View style={style.fontView}>
          <TextFont
            bold
            style={{
              fontSize: 14,
              color: objectCl.workingTimeInfo.isWorking ? 'green' : 'red',
              textAlign: 'center',
            }}
          >
            {objectCl.workingTimeInfo.isWorking ? 'Otvoreno sada' : 'Trenutno ne radi'}
          </TextFont>
        </View>
      </View>
    </View>
  </View>
);
export default WorkingTimeSection;
