import React, { Component } from "react";
import { View } from "react-native";
import TextFont from 'TextFont';
import WorkingTimesItem from "./WorkingTimesItem";
 import Swiper from 'react-native-swiper-animated';

function giveMeSwiper(sectors) {
  if (sectors.length) {
    return (
      <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>
        <Swiper
          smoothTransition
          loop
          showPagination={false}
          backPressToBack={false}
          swiperThreshold={30}
        >
          {
            sectors.map((item, k) => (
              <View key={k} style={{flex: 1, height: 190, flexDirection: 'column'}}>
                <TextFont
                  bold
                  style={{
                    color: 'rgb(154, 154, 154)',
                    fontSize: 16,
                    paddingLeft: 10,
                  }}
                >
                  {item.name || 'Radno vreme'}
                </TextFont>
                <WorkingTimesItem additionalInfo={item.monday} period={`Pon`} />
                <WorkingTimesItem additionalInfo={item.tuesday} period={`Uto`} />
                <WorkingTimesItem additionalInfo={item.wednesday} period={`Sre`} />
                <WorkingTimesItem additionalInfo={item.thursday} period={`Čet`} />
                <WorkingTimesItem additionalInfo={item.friday} period={`Pet`} />
                <WorkingTimesItem additionalInfo={item.saturday} period={`Sub`} />
                <WorkingTimesItem additionalInfo={item.sunday} period={`Ned`} />
              </View>
            ))
          }
        </Swiper>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>
      <TextFont
        bold
        style={{
          color: 'rgb(154, 154, 154)',
          fontSize: 16,
          paddingLeft: 10,
        }}
      >Nemamo radno vreme
      </TextFont>
    </View>
  );
}
const WorkingTimes = ({ alo, sectorInfo }) => {
  const times = [];
  times.push(alo);
  if (sectorInfo.length) {
    times.push(...sectorInfo);
  }
  return (
    <View style={{ flex: 1 }}>
      {
        giveMeSwiper(times)
      }
    </View>
  );
};
export default WorkingTimes;