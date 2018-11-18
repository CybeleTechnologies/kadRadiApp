import React from 'react';
import { withRouter } from 'react-router-dom';
import { View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const MapViewDumb = ({ objectCl, coordinates, mapStyled, history }) => {
  return (
    <View>
      <MapView
        style={{
          width: '100%',
          height: responsiveHeight(100),
        }}
        provider="google"
        showsUserLocation
        showsMyLocationButton
        showsCompass
        followsUserLocation
        loadingEnabled
        toolbarEnabled
        zoomEnabled
        scrollEnabled
        rotateEnabled
        initialRegion={{
          latitude: coordinates.latitude || 44.787197,
          longitude: coordinates.longitude || 20.457273,
          latitudeDelta: 0.215,
          longitudeDelta: 0.215,
        }}
      >
        {
          objectCl.length ? objectCl.map((item, index) => (
            <Marker
              key={index}
              // onPress={(e) => history.push(`/object-page/${item.id}`)}
              image={item.workingTimeInfo.isWorking ? require('../../imgs/sat-radi.png') : require('../../imgs/sat-neradi.png')}
              coordinate={{
                latitude: item.objectLocations.lat || 44.787197,
                longitude: item.objectLocations.lng || 20.457273,
              }}
              description={item.objectLocations.address}
              title={item.name}
              onCalloutPress={() => history.push(`/object-page/${item.id}`)}
            />
          )) : null
        }
      </MapView>
    </View>
  );
};


export default withRouter(MapViewDumb);
