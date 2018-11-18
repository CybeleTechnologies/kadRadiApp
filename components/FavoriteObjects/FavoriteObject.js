import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { List } from 'react-native-elements';
import CategorySubheader from '../CommonDumb/CategorySubheader';
import CategoryListItem from '../CommonDumb/ListItem';
import ListHeader from '../CommonDumb/ListHeader';
import Loader from '../CommonDumb/Loader';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

@connect(state => { return {
  userProfile: state.userProfile,
  }}, mapDispatchToProps)
@graphql(
  gql` query favoriteObjects($token: String!) {
    favoriteObjects(token: $token){
      id
      name
      avgRating
      ratingCount
      objectCategory {
        name
      }
      images {
        profileImage {
          fileUrl
          desc
        }
      }
      workingTimeInfo {
        isWorking
      }
      objectLocations {
        city
        address
      }
    }
  }`,
  {
    options: (props) => ({
      variables: {
        token: props.userProfile.token,
      },
      fetchPolicy: 'network-only'
    })
  }
)

class FavoriteObjects extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
     const {favoriteObjects} = this.props.data || [];
    return (
      <View 
        style={{
          flex:1,
          backgroundColor: 'white',
          width: responsiveWidth(100),
        }}
      >
        {
          this.props.data.loading ? <Loader /> :

            <View style={{flex:1, flexDirection: 'column', width: responsiveWidth(100), justifyContent: 'flex-start'}}>
              <ListHeader textHeader={`Sačuvana mesta (${favoriteObjects.length})`} />
              <ScrollView>
                <List containerStyle={{marginBottom: 20, marginTop: 0,borderTopColor: 'rgb(108, 108, 108);'}}>
                  {
                    favoriteObjects.length ? favoriteObjects.map((object, i) => (
                      <CategoryListItem
                        addIdsAction={this.props.addIdsActions}
                        objectId={object.id}
                        key={i}
                        objectImg={object.images.profileImage.fileUrl}
                        keyId={i + 1}
                        avgRating={object.avgRating}
                        objectName={object.name}
                        reviewNumber={object.ratingCount}
                        categoryName={object.objectCategory.name}
                        isWorking={object.workingTimeInfo.isWorking}
                        locations={object.objectLocations}
                      />
                    )) : null
                  }
                </List>
              </ScrollView>
            </View>
        }
       <View
          style={{
            width: '100%',
            padding: 13,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity>
            <Image 
              source={require('../../imgs/lista.png')}
              style={{width: 60, height: 30,}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.history.push('/maps-view-favoriteObjects')}
          >
            <Image 
              source={require('../../imgs/mapa.png')} 
              style={{width: 60, height: 30,}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default FavoriteObjects;