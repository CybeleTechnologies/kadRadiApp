import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import TextFont from 'TextFont';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { SearchBar } from 'react-native-elements';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { addInLiveActiveId } from '../../actions/increments';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

@connect((state) => {
  return {
    liveActive: state.liveActive,
    locationId: state.locationId
  }
}, mapDispatchToProps)

@graphql(
  gql` query location {
    location{
     id 
     name
     childAreas{
       name
       id
     }
    }
  }`
)

class LiveSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result : [],
      isVisible: false,
    };
  }

  setVisible = (e) => {
    if(e === ''){
      this.setState({
        isVisible: false,
      })
    }else{
      this.setState({
        isVisible: true,
      })
    }

  }

  filterLocation = (e, arr) => {
    let arrFilter = [];
    arrFilter = arr.filter(word => word.name.toLowerCase().includes(e.toLowerCase()));
    this.setState({
      result: arrFilter
    })
  }

  componentWillMount(){
    
  }

  createLocatonObj = (obj) => {
    let arr = [];
    for (let location in obj) {
      let parent = {
        name: obj[location].name,
        id: obj[location].id
      }
      let newArr = obj[location].childAreas.map((item, key) => {
        return ({
          key: key,
          name: obj[location].name + ", " + item.name,
          id: item.id,
        })
      })
      arr = [...newArr, parent]
    }
    return arr;
  }
  searchBtn = (searchItem) => {
    this.props.changeLocationId(searchItem)
    this.setState({
      isVisible: false,
    })
  }

  render() {
     let { data } = this.props || [];
     let { location } = data || [];
     let arr = this.createLocatonObj(location);
    return (
      <View style={style.container}>
        <View style={style.searchContainer}>
          <TouchableOpacity style={style.buttonSearch}>
            <Image source={require('../../imgs/searchlive.png')}
              style={{
                width: 25,
                height: 25,
                borderRadius: 10,
              }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <SearchBar
            noIcon
            padding={0}
            margin={0}
            containerStyle={{ padding: 0, margin: 0, backgroundColor: 'red', borderTopWidth: 0, borderTopColor: 'rgba(0,0,0,0)', borderBottomWidth: 0, borderBottomColor: 'rgba(0,0,0,0)' }}
            height={38}
            width={170}
            inputStyle={{
              backgroundColor: 'white',
              borderRadius: 0,
              padding: 0,
              margin: 0,
              borderLeftWidth: 0.5,
              borderRightWidth: 0.5,
              borderColor: '#f5f5f5',
            }}
            onChangeText={(e) => {
              this.filterLocation(e, arr);
              this.setVisible(e);
            }}
            placeholderStyle={{ fontFamily: 'OpenSans-Regular' }}
            placeholder='Srbija, Beograd'
          />
          <TouchableOpacity style={style.buttonMap}>
            <Image source={require('../../imgs/livesearch.png')} style={{ width: 30, height: 31, borderRadius: 10 }} />
          </TouchableOpacity>
        </View>
          <View 
            style={{flex: 1, backgroundColor: '#fff', position: 'absolute', top: 45, zIndex: 1, width: 250, borderRadius: 6, borderWidth: 0.5, borderColor: 'black'}}>
            
            {
              this.state.isVisible ?
              <View style={this.state.result.length > 7 ? {height: 250} : null}> 
              <ScrollView>            
              {                                            
              this.state.result.map((item, key) => (
                item === "" ?
                  null
                  :
                  this.state.isVisible ? 
                  <TouchableOpacity 
                    key={key} 
                    style={{
                      width: 250, 
                      height: 30, 
                      backgroundColor: '#fff',
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderTopColor: 'black',
                      borderTopWidth: 0.5,
                      borderRadius: 10,
                    }}
                    onPress={() => this.searchBtn(item.id) }
                  >
                    <TextFont style={{backgroundColor: '#fff'}}>{item.name}</TextFont>
                  </TouchableOpacity>
                  :
                  null
              ))
              
            }
            </ScrollView>          
            </View>
            :
            null
            }

        </View>     
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  searchContainer: {
    width: 250,
    height: 40,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  buttonSearch: {
    width: 40,
    height: 37,
    borderRightWidth: 1,
    padding: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonMap: {
    width: 39,
    height: 37,
    borderRightWidth: 1,
    padding: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },

});


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default LiveSearch;

