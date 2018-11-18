import React from 'react';
import { 
  View, 
  Image,
  Dimensions,
} from 'react-native';
import Loader from '../../CommonDumb/Loader';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import MapView, { Marker } from 'react-native-maps';
import MostImportantAddress from './MostImportantDumb/MostImportantAddress';
import MostImportantImages from './MostImportantDumb/MostImportantImages';
import WorkingTimeSection from './MostImportantDumb/WorkingTimeSection';
import MostImportantOffer from './MostImportantDumb/MostImportantOffer';
import ObjectClockMain from '../ObjectComponentDumb/ObjectClockMain';
import WorkingTimes from './MostImportantDumb/WorkingTimes';
import MostImportantRews from './MostImportantDumb/MostImportantReviews/MostImportantRews';
import MostImportantTitle from './MostImportantDumb/MostImportantTitle';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import SwiperFlatList from 'react-native-swiper-flatlist';
import TextFont from 'TextFont';
const { width } = Dimensions.get('window');

@withRouter
@graphql(
  gql`query objectCl($id: Int) {
    objectCl(id: $id){
      name
      isWorking
      workingTimeInfo {
        isWorking
        alwaysOpen
        sunday {
          opening
          closing
        }
        saturday {
          opening
          closing
        }
        monday {
          opening
          closing
        }
        tuesday {
          opening
          closing
        }
        wednesday {
          opening
          closing
        }
        thursday {
          opening
          closing
        }
        friday {
          opening
          closing
        }
        specialTime {
          id
          name
          opening
          closing
          icon
          date
        }
      }
      sectorTimeInfo {
        name
        id
        monday{
          opening
          closing
        }
        tuesday{
          opening
          closing
        }
        wednesday{
          opening
          closing
        }
        thursday{
          opening
          closing
        }
        friday{
          opening
          closing
        }
        saturday{
          opening
          closing
        }
        sunday{
          opening
          closing
        }
      }
      images {
        exteriorImage {
          desc
          fileUrl
        }
      }
      objectLocations {
        address
        city
        zipCode
        lat
        lng
      }
    }
  }`,
  {
    options: ({objectId}) => ({
      variables: {
        id: objectId,
      },
      fetchPolicy: 'network-only'
    })
  }
)
class MostImportantContainer extends React.Component {
  cuttingString = str1 => {
    let hour = str1.slice(0,2);
    let minutes = str1.slice(2,4);
    let result = hour + ' : ' + minutes;
    return result;
  }

  swiper = (special) => (
    <View style={{ width: '100%', flexDirection: 'row', height: 250}}>
      <SwiperFlatList 
        style={{}}
      >
        {
          special.length
          ? 
          special.map((item, key) => (
            <View key={key} style={{width, height: 250, justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgb(253, 161, 76);', flexDirection: 'column', padding: 25}}>
              <View style={{flexDirection: 'row'}}>
                <TextFont bold style={{fontSize: 22, color: 'white'}}>{item.name}</TextFont>
              </View>
              <Image 
                source={{uri: item.icon}}
                style={{width: 100, height: 100}}
                resizeMode={'contain'}
              />
              <TextFont bold style={{ fontSize: 15.2, color: 'white'}}>Datum: {item.date}</TextFont>
              <TextFont bold style={{ fontSize: 16, color: 'white'}}>Radno vreme: {this.cuttingString(item.opening == null ? '0830': item.opening)} - {this.cuttingString(item.closing == null ? '2333': item.closing)}</TextFont>
            </View>
          ))
          : 
          <TextFont>Nema specijalnih datuma</TextFont>
        }
      </SwiperFlatList>
   </View>
  )
  render() {
    let [objectCl] = this.props.data.objectCl || [];
    let { workingTimeInfo } = objectCl || {};
    let { specialTime } = workingTimeInfo || [];
    return (
      this.props.data.loading ? <Loader /> :
      typeof objectCl != 'undefined' ?
      <View style={{flexDirection: 'column',}}>
        <View
          style={{width: '100%', height: responsiveHeight(15), borderTopWidth: 1, borderTopColor: '#efefef', borderBottomWidth: 1, borderBottomColor: '#efefef'}}>
          <MapView
            style={{width: '100%', height: responsiveHeight(14.7),}}
            provider="google"
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            followsUserLocation={true}
            loadingEnabled={true}
            toolbarEnabled={true}
            zoomEnabled={true}
            scrollEnabled={false}
            rotateEnabled={true}
            initialRegion={{
              latitude: objectCl.objectLocations.lat || 44.787197,
              longitude: objectCl.objectLocations.lng || 20.457273,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            }}
            >
            <Marker
               coordinate={{
                latitude: objectCl.objectLocations.lat || 44.787197,
                longitude: objectCl.objectLocations.lng || 20.457273,
              }} />
          </MapView>
        </View>
        <MostImportantAddress objectLocations={ objectCl.objectLocations } name={objectCl.name} address={objectCl.objectLocations.address}/>
        <MostImportantImages objectImagesArr={ objectCl.images.exteriorImage } selectIndex={this.props.changeButton}/>
        <MostImportantOffer />
        <WorkingTimeSection objectCl={objectCl} />
        {
          specialTime.length 
          ?
          <View>
          <MostImportantTitle title="Radno vreme za vreme praznika" />
            {
            this.swiper(specialTime)
            }
          </View>
          :
          null
        }
        <MostImportantRews />
      </View> : null
    )
  }
}

export default MostImportantContainer;
