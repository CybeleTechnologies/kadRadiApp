import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import StarRating from 'react-native-star-rating';
import TextAndIcon from './TextAndIcon';
import MostImportantTitle from '../MostImportantTitle';
import TextFont from 'TextFont';
import Modal from 'react-native-modal';
class RewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      super: false,
      hvala: false,
      beskorisno: false,
      url: '',
      visibleModal: false,
    };
  }
  viewImage = (url, showModal) => {
    this.setState({
      url,
      visibleModal: showModal,
    })
  }
  render() {
    const {
      id,
      person,
      textReview,
      rating,
      photoCount,
      image,
      likes,
    } = this.props.objectReview || {};
    return (
      <View style={this.props.withoutBorder ? this.props.withoutBorder : styles.container}>
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
                }}
              >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}> X </Text>
              </TouchableHighlight>
              <Image source={{uri: this.state.url}} style={{width: '100%', height: 500}}/>
            </Modal>:
            <View></View>
        }
        {
          typeof this.props.objectReview !== 'undefined' ?
            (
              <View style={styles.subContainer}>
                <View style={styles.infoContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <Image
                        style={styles.avatarImage}
                        source={{uri: person.profileInfo.profileImageUrl}}
                      />
                    </View>
                    <View style={styles.profileName}>
                      <TextFont
                        semiBold
                        style={{
                          fontSize: 16,
                        }}
                      >
                        {`${person.firstName} ${person.lastName}`}
                      </TextFont>
                      <View style={styles.profileIconsContainer}>
                        <TextAndIcon 
                          imageUrl={require('../../../../../imgs/friendsIco.png')}
                          numbersStyle={{textAlignVertical: 'center', paddingLeft: 2}}
                          numbers={person.profileInfo.followers}
                        />
                        <TextAndIcon
                          numbersStyle={{textAlignVertical: 'center', paddingLeft: 2}}
                          numbers={person.profileInfo.stars}
                          containerStyle={{paddingLeft: 4}}
                          imageUrl={require('../../../../../imgs/redStarIco.png')} />
                        <TextAndIcon
                          numbersStyle={{textAlignVertical: 'center', paddingLeft: 3}}
                          numbers={person.profileInfo.photos}
                          containerStyle={{paddingLeft: 4}}
                          imageUrl={require('../../../../../imgs/cameraIco.png')} 
                        />
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row',alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {
                        image !== '' ?
                          <TouchableOpacity
                            onPress={() => {
                              this.viewImage(image, true)
                            }}
                          >
                            <Image
                              source={require('../../../../../imgs/cameraIco.png')} 
                              style={{ width: 30 }}
                              resizeMode="center"
                            />
                          </TouchableOpacity>
                        : null
                      }
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <StarRating 
                        disabled
                        emptyStar={require('../../../../../imgs/ratingEmpty.png')}
                        fullStar={require('../../../../../imgs/ratingFull.png')}
                        halfStar={require('../../../../../imgs/ratingHalf.png')}
                        iconSet={'Ionicons'}
                        maxStars={5}
                        starSize={15}
                        rating={rating}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingLeft: 5,
                      }}
                    >
                      <Image
                        source={require('../../../../../imgs/ikonica-ocena.png')}
                        resizeMode={'center'}
                        style={{
                          width: 30,
                          height: 30,
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={{color: 'white', fontSize: 17}}>{rating}</Text>
                      </Image>
                    </View>
                  </View>
                </View>
                <View style={{padding: 10,}}>
                  <TextFont style={{fontSize: 12,}}>
                    {`${textReview}`}
                  </TextFont>
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonSubContanier}>
                    <View>
                      <TouchableOpacity
                        disabled={likes.myLike === 2 || likes.myLike === 3 ? true : false }
                        onPress={() => {
                          if (likes.myLike !== 1) {
                            if (this.props.info) {
                              this.props.likeMe(id, 1);
                              this.setState({
                                super: true,
                              });
                            } else {
                              this.props.likeMeMost(id, 1);
                              this.setState({
                                super: true,
                              });
                            }
                          } else {
                            if (this.props.info) {
                              this.props.mutationDislike(id);
                              this.setState({
                                super: false,
                              });
                            } else {
                              this.props.disLikeMost(id);
                              this.setState({
                                super: false,
                              });
                            }
                          }
                        }}
                      >
                        <Image
                          source={likes.myLike === 1 || this.state.super ? require('../../../../../imgs/superActive.png') : require('../../../../../imgs/super.png')}
                          style={styles.rewButton} 
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        disabled={likes.myLike === 1 || likes.myLike === 3 ? true : false }
                        onPress={() => {
                          if (likes.myLike !== 2) {
                            if (this.props.info) {
                              this.props.likeMe(id, 2);
                              this.setState({
                                hvala: true,
                              });
                            } else {
                              this.props.likeMeMost(id, 2);
                              this.setState({
                                hvala: true,
                              });
                            }
                          } else {
                            if (this.props.info) {
                              this.props.mutationDislike(id);
                              this.setState({
                                hvala: false,
                              });
                            } else {
                              this.props.disLikeMost(id);
                              this.setState({
                                hvala: false,
                              });
                            }
                          }
                        }}
                      >
                        <Image
                          style={styles.rewButton}
                          source={likes.myLike === 2 || this.state.hvala ? require('../../../../../imgs/thanksActive.png') : require('../../../../../imgs/thanks.png')} />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        disabled={likes.myLike === 1 || likes.myLike === 2 ? true : false }
                        onPress={() => {
                          if (likes.myLike !== 3) {
                            if (this.props.info) {
                              this.props.likeMe(id, 3);
                              this.setState({
                                beskorisno: true,
                              });
                            } else {
                              this.props.likeMeMost(id, 3);
                              this.setState({
                                beskorisno: true,
                              });
                            }
                          } else {
                            if (this.props.info) {
                              this.props.mutationDislike(id);
                              this.setState({
                                beskorisno: false,
                              });
                            } else {
                              this.props.disLikeMost(id)
                              this.setState({
                                beskorisno: false,
                              });
                            }
                          }
                        }}
                      >
                        <Image
                          style={styles.rewButton}
                          source={likes.myLike === 3 || this.state.beskorisno ? require('../../../../../imgs/uselessActive.png') : require('../../../../../imgs/useless.png')} /> 
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
            :
            (
              <MostImportantTitle
                title="Trenutno nemamo komentare"
                viewStyle={styles.mostImportantTitle} 
              />
            )
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 1,
    borderTopColor: '#a9a9a9',
    borderTopWidth: 1,
  },
  subContainer: {
    flexDirection: 'column',
    width: '100%',
    alignSelf: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom: 0,
  },
  avatarImage: {
    width: responsiveHeight(7.5),
    height: responsiveHeight(7.5),
    borderRadius: responsiveHeight(7.5) / 2,
  },
  profileName: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  profileIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(8),
    borderTopColor: '#a9a9a9',
    borderTopWidth: 1,
  },
  buttonSubContanier: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewButton: {
    width: 105,
    height: 35,
  },
});
export default RewItem;
