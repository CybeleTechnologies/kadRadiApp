import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import Item from './InformationDumb/Item';
import Loader from '../../CommonDumb/Loader';
import RaitingAndReview from './InformationDumb/RaitingAndReview';
import MostImportantTitle from './MostImportantDumb/MostImportantTitle';
import BigButton from '../../CommonDumb/BigButton';
@withRouter
@graphql(
  gql`query objectCl($id: Int) {
    objectCl(id: $id){
      avgRating,
      ratingCount
      objectInfo {
        websiteUrl,
        hasRestaurant,
        popularBecauseOf,
        phone{
          desc,
          number
        }
        additionalInfo
      }
      ObjectReview {
        person {
          firstName,
          lastName,
        }
        textReview,
        rating
      }
    }
  }`,
  {
    options: ({objectId}) => ({
      variables: {
        id: objectId,
      }
    }) 
  } 
)

class InformationContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let [objectCl] = this.props.data.objectCl || [];
    let {objectInfo} = objectCl || {};
    let phone = [];
    if(!this.props.data.loading) { 
      phone = objectInfo.phone || [];
    }
    return (
      <View>
        <MostImportantTitle title={'Informacije'} />
        {
          this.props.data.loading?
          <Loader />:
          <View style={{flexDirection: 'row', width: responsiveWidth(100)}}>
            <View style={{flexDirection: 'column', width: responsiveWidth(40), margin: responsiveWidth(5)}}>
              <Item styleProps={{color: 'rgb(103, 186, 90)', fontWeight: 'bold'}} title={'Telefon'} phone={true} content={phone}/> 
              <View style={{ flexDirection: 'row', width: responsiveWidth(100), justifyContent: 'space-between'}}>
                <Item title={'Popularan zbog'} content={objectInfo.popularBecauseOf} popular={true}/>
              </View>
              <View style={{ flexDirection: 'row', width: responsiveWidth(100), justifyContent: 'space-between'}}>
                <Item price={true} title={'Cene'} priceNumber={'2'} /> 
              </View>
              <View style={{ flexDirection: 'row', width: responsiveWidth(100), justifyContent: 'space-between'}}>
              <Item title={'Način plaćanja'} content={'Gotovina i kreditne kartice'} paymentMethod={true}/>
              </View>
              <View style={{ flexDirection: 'row', width: responsiveWidth(100), justifyContent: 'space-between'}}>
                <Item  web={true} title={'Web sajt'} content={'Otvori web sajt'} url={objectInfo.websiteUrl} />
              </View>
            </View>
            <View style={{flexDirection: 'column', width: responsiveWidth(40), margin: responsiveWidth(5)}}>
                <Text style={{fontSize: 15,color: 'rgb(156, 155, 156)'}}>Dodatne informacije</Text>
                {
                  objectInfo.additionalInfo.map((item,key) => (
                    <View key={key} style={{flexDirection: 'row', margin: 2}}>
                      <Image 
                        source={require('../../../imgs/checked.png')}
                        style={{width: 20, height: 20}}
                        />
                        <Text> {item}</Text>   
                    </View>
                  ))
                } 
            </View>
          </View> 
        }
        <MostImportantTitle title={'Ocene i utisci'} />
        <RaitingAndReview avg={objectCl != undefined ? objectCl.avgRating : ''} count={objectCl != undefined ? objectCl.ratingCount : ''} reviewOne={objectCl != undefined ? objectCl.ObjectReview : null} />
        <MostImportantTitle title={'Posećenost'} />
        <Text> Ovo treba da se proveri sta da radimo</Text>
        <MostImportantTitle 
          title="Ovo je vaš posao?"
        />
        <View style={{paddingTop: 10, paddingBottom: 5,}}>
          <View style={{flexDirection: 'column', alignSelf:'center', justifyContent: 'flex-start', alignItems: 'center',  width: '95%'}}>
            <View style={{width: '60%', justifyContent: 'center', alignItems: 'flex-start', alignSelf: 'flex-start', paddingBottom: 7}}>
              <Text>Postanite deo Vime zajednice i unapredite svoj posao!</Text>
            </View>
            <BigButton
              title="Dodajte kao svoj objekat"
              onAction={() => {
                this.props.history.push(`/addToYourObject/${this.props.objectId}`)
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default InformationContainer;
