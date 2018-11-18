import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import ProfileHero from '../DumbComponents/ProfileDumb/ProfileHero';
import Friends from './Friends'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { withRouter } from 'react-router-dom';
import { List, ListItem } from 'react-native-elements';
import { styles } from '../../Styles/Styles';
import TextFont from 'TextFont';
import ProfileOptions from './ProfileOptions';
import MyCheckedPlace from './MyCheckedPlace';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

@connect((state) => {return {
  menuVisible: state.menuVisible,
  userProfile: state.userProfile,
  }}, mapDispatchToProps)
@graphql(
  gql` query people($id: Int) {
    people(id: $id){
      email
      firstName
      lastName
      token
      profileInfo {
        profileImageUrl
        photos
        checkedPlaces
        favorites
        favoritesPlacesId
        checkedPlacesId
      }
      friends {
        id,
        firstName,
        lastName,
        profileInfo {
          profileImageUrl,
          checkedPlaces
          favorites
        }
        email
      }
    }
  }`,
  {
    options: (props) => ({
      variables: {
        id: props.userProfile.id,
      },
      fetchPolicy: 'network-only'
    })
  }
)




class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ispunjeniZadaci: 0,
      sacuvanoMesto: 0,
      glasaj: 0,
      page: 0,
      ar:[],
      title: 'Aktivnosti',
    };
  }
  showFr = () => {
    this.setState({
      page: 1, 
      title: 'Prijatelji'
    })
  }
  showCheckd = () => {
    this.setState({
      page: 2,
      title: 'Cekirana mesta',
    })
  }

  showFav = () => {
    this.setState({
      page: 3,
      title: 'Omiljena mesta'
    })
  }

  render() {
    let {data} = this.props || [];
    let {people} = data || [];
    let {friends} = people || [];

    // if(data.loading){
    //   console.log("LOADING");
    // }else{
    //   people.map(item => {
    //     this.setId(item.profileInfo.checkedPlacesId);

    //   })
    // }

    console.log(this.state.it, "ITTTTTTTTTTTTTTT");
    return (
      <View style={style.container}>
        <Image
          source={require('../../imgs/pozadinablur.jpg')} 
          style={{
            width: '100%',
            height: responsiveHeight(21), 
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
              {/* <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: responsiveHeight(4) }}>
                <Image source={require('../../imgs/akcija.png')} style={{ width: 35, height: 35 }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: responsiveHeight(4) }}>
                <Image source={require('../../imgs/akcija.png')} style={{ width: 35, height: 35 }} />
              </TouchableOpacity> */}
            </View>
            <View style={{ flex: 1 }}>
              <ProfileHero
                profileImg={this.props.userProfile.profileImageUrl} 
                firstName={this.props.userProfile.firstName} 
                lastName={this.props.userProfile.lastName}
              />
            </View>
            <View style={{ flex: 1 }}>
            </View>
          </View>
        </Image>
        <ProfileOptions friends={this.props.userProfile.friends.length} pictures={this.props.userProfile.photos} cekirana={this.props.userProfile.checkedPlaces} omiljena={this.props.userProfile.favorites} showChecked={() => this.showCheckd()} showFriends={() => this.showFr()} showFavorites={() => this.showFav() }/>
        <View style={style.scrollContainer}>
          <ScrollView containerStyle={{ }} style={{}}>
            <View
              style={{
                flexDirection: 'row',
                height: responsiveHeight(6),
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingLeft: 10,
              }}
            >
              <TextFont
                style={{
                  fontSize: responsiveFontSize(2.3),
                }}
              >
                {this.state.title}
              </TextFont>
            </View>
            
              {
                this.props.data.loading ?
                  <View>
                    <TextFont>Loading...</TextFont>
                  </View>
                    :
                  <View>
                    {
                      this.state.page === 1 ? 
                      people.map((item,key) => (
                        <View>
                          {
                            item.friends.map(friend => (
                              <Friends 
                              firstName={friend.firstName}
                              lastName={friend.lastName}
                              profileImageSrc = {friend.profileInfo.profileImageUrl }
                            />
                            ))
                          }
                        </View>
                      ))
                    : this.state.page === 2 ? 
                      people.map((item2, key) => (
                        // item2.profileInfo.checkedPlaces.length ? 
                        <View key={key}>
                          <MyCheckedPlace 
                            arr = {item2.profileInfo.checkedPlacesId}
                          />
                        </View>
                        // :
                        // <View>
                        //   <TextFont>Nemate cekiranih mesta</TextFont>
                        // </View>
                      ))
                    : this.state.page === 3 ?
                    people.map((item3, key) => (
                      <View>
                        <MyCheckedPlace 
                        arr = {item3.profileInfo.favoritesPlacesId}
                        />
                      </View>
                    ))
                    :
                    <View style={styles.aktivnostiProfil}>
                      <TextFont
                        style={{
                          fontSize: 14,
                        }}
                      >
                        Nažalost nema nikakvih aktivnosti...
                      </TextFont>
                    </View>
                    }                  
                  </View>
                }
          </ScrollView>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  scrollContainer: {
    height: responsiveHeight(42),
    flexDirection: 'column',
    backgroundColor: 'rgb(243, 243, 242)',
    justifyContent: 'flex-start',
    
  },
  listContainer: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    marginTop: 0,
  },
  titleStyle: {
    color: 'black',
    fontSize: responsiveFontSize(1.6),
    fontFamily: 'OpenSans-Regular',
  },
  listContainerStyle: {
    borderBottomColor: 'white',
    borderTopColor: 'rgb(236, 236, 236)',
    borderTopWidth: 1,
  },
  listItemTitle: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'OpenSans-Regular',
    color: '#a6a6a6',
  },
  listItemContainer: {
    borderTopColor: 'rgb(236, 236, 236)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(236, 236, 236)',
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default withRouter(connect((state) => {return {
  userProfile: state.userProfile,
}}, mapDispatchToProps)(MyProfile));
