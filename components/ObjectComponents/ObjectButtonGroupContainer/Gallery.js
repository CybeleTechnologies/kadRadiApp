import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Loader from '../../CommonDumb/Loader';
import Modal from 'react-native-modal';
import SwiperImage from './GalleryDumb/SwiperImage';
import Buttons from './GalleryDumb/Buttons';
import DifferentImages from './GalleryDumb/DifferentImages';
const { width } = Dimensions.get('window')
@withRouter
@graphql(
  gql`query objectCl($id: Int) {
    objectCl(id: $id){
      images {
        exteriorImage {
          desc
          fileUrl
        }
        interiorImage {
          desc
          fileUrl
        }
        foodImage {
          desc
          fileUrl
        }
        userImage {
          desc
          fileUrl
        }
      }  
    }
  }`,
  {
    options: ({objectId}) => ({
      variables: {
        id: objectId,
      },
      fetchPolicy: 'network-only',
    })
  } 
)

class Gallery  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      fileUrl: '',
      index: null,
      view: 'all'
    }
  }

  imageSetState = (visibleModal, fileUrl,index) => {
    this.setState({
      visibleModal,
      fileUrl,
      index,
    });
  }

  setView = (view) => {
    this.setState({
      view
    });
  }

  render() {
    let [objectCl] = this.props.data.objectCl || [];
    let {images} = objectCl || {};
    let allImg = [];
     if(!this.props.data.loading) {
       let first = allImg.concat(images.exteriorImage);
       let secuond = first.concat(images.interiorImage);
       let userImage = secuond.concat(images.userImage)
       allImg = userImage.concat(images.foodImage); 
     }
    return (
      <View>
      {
        this.state.visibleModal? 
         <Modal
          isVisible={this.state.visibleModal}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          >
            <TouchableHighlight 
              onPress={() => {
                this.setState({
                  visibleModal: false,
                })
              }}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 99,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}> X </Text>
            </TouchableHighlight>
            <SwiperImage all={allImg} ex={images.exteriorImage} in={images.interiorImage} food={images.foodImage} view={this.state.view} index={this.state.index}/>
          </Modal>:
          <View></View>
      }
        <View style={{flexDirection: 'row'}}>
          {
            this.props.data.loading ?
            <Loader /> :         
              <View style={{flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
                {
                  !allImg.length?
                  <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>Nemamo slike za ovaj objekat</Text>
                  :
                  <View>
                    <Buttons  setView={this.setView} allImg={allImg} images={images}/>
                    {
                    this.state.view === 'all'?
                    <DifferentImages setView={this.setView} imageSetState={this.imageSetState} maping={allImg}/>:null
                    }
                    {
                    this.state.view === 'eksterijer'?
                    <DifferentImages  setView={this.setView} imageSetState={this.imageSetState} maping={images.exteriorImage} />:null
                    }
                    {
                    this.state.view === 'enterijer'?
                    <DifferentImages  setView={this.setView} imageSetState={this.imageSetState} maping={images.interiorImage} />:null 
                    }
                    {
                    this.state.view === 'food'?
                    <DifferentImages  setView={this.setView} imageSetState={this.imageSetState} maping={images.foodImage} />:null 
                    }
                  </View>
                 }
              </View>
          }
        </View>
      </View>
    )
  } 
}
export default Gallery;
