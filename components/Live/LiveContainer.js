import React from 'react';
import {
  View,
  Image,
  List,
  Text,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import LiveCarousel from './LiveCarousel';
import RawText from './RawText';
import TextFont from 'TextFont';
import HeaderForSearched from './HeaderForSearched';
import LiveResponseItem from './LiveResponseItem';
import LiveResponse from './LiveResponse';
import LiveSearch from './LiveSearch';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-native';
import BigButton from '../CommonDumb/BigButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import LiveQuestion from './LiveQuestion';
import moment from 'moment';
import Loader from '../CommonDumb/Loader';


@graphql(
  gql` query liveQuestions($objectCategoryId: Int, $locationId: Int, $page: Int) {
    liveQuestions(objectCategoryId: $objectCategoryId, locationId: $locationId, page: $page){
      id
      title
      text
      date
      liveAnswers
      answered
      person{
        profileInfo{
          profileImageUrl
        }
      }
    }
  }`, 
  {
    options: ( props ) => ({
      variables: {
        objectCategoryId: props.liveActive.activeId,
        locationId: props.locationId.id,
        page: 1,
      },
      fetchPolicy: 'network-only',
    })
  }
)

class LiveContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pomoc : true,
      isRawVisible : true,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
  }

  componentWillReceiveProps() {
    const query = async () => {
      let newItem = await this.props.data.refetch(
        {
          objectCategoryId: this.props.liveActive.activeId,
          locationId: 1,
          page: 1,
        }
      );
    }  
  }
  handleBack = () => {
      if (!this.state.pomoc && this.props.visibleLive.open){
        this.setState({
          pomoc: true
        })
      }
  }

  rawHide = () => {
    this.setState({
      isRawVisible: false,
    })
  }

  categoryName(category){
    let name = "";
    switch(category){
      case 1:
        name = "Banke";
        break;
      case 2: 
        name = "Apoteke";
        break;
      case 3: 
        name = "Brza hrana";
        break;
      case 4:
        name = "Hoteli";
        break;
      case 5: 
        name = "Klinike";
        break;
      case 6: 
        name = "Kafici";
        break;
      default: 
        name = "default"
    }
    return name;
  }

  render() {
    let {data} = this.props || [];
    let {liveQuestions} = data || [];
    return (
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
        }}
      >
        <LiveCarousel />
        <Image
          source={require('../../imgs/pozadinablur.jpg')}
          style={{
            width: '100%',
            height: responsiveHeight(18),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center',}}>
            <TextFont style={{ flex: 1, color: '#fff', marginTop: 8 }}>Izaberite kategoriju</TextFont>
            <LiveSearch style={{ flex: 1, position: 'absolute', height: 300 }} />
            <TextFont style={{ flex: 1, color: '#fff', marginTop: 10 }}>Izaberite lokaciju</TextFont>
          </View>
        </Image>
        { this.state.pomoc ? (
            <View style={{ height: responsiveHeight(52),}}>
              <HeaderForSearched
                headerText={this.categoryName(this.props.liveActive.activeId)}
              />
               {
                this.props.data.loading ? 
                <View>
                  <Loader />
                </View> :
              <ScrollView containerStyle={{ }} style={{}}>
              {
                    liveQuestions.map((shane, key) => (
                    <TouchableOpacity key={key} onPress={() => {
                      this.props.history.push(`/live-question-detail/${shane.id}`);
                      this.props.liveVisible(false);
                    }
                    }>
                      <LiveResponseItem
                        itemTitle={shane.title}
                        itemText = {shane.text}
                        dateFound={moment(shane.date).format('L')} 
                        commentsCount={shane.liveAnswers}
                        responsed = {shane.answered}
                        imgUrl = {shane.person.profileInfo.profileImageUrl}
                      />
                    </TouchableOpacity>
                  ))
                }
              </ScrollView>  
                }      
              {
                this.state.isRawVisible ? 
                <RawText 
                style={{}}
                hideRaw = {()=>{
                  this.rawHide();
                }}
              />
              :
              <TouchableOpacity 
              style={{position: 'absolute', bottom: 2, right: 8}}
              onPress={() => {
                this.setState(previousState => ({
                  pomoc: !previousState.pomoc,
                  isRawVisible: true,
                }))
              
              }}
            >
              <Image source={require('../../imgs/Chatdugme.png')} style={{width: 50, height: 50}}/>
            </TouchableOpacity>
              }        
              <TouchableOpacity 
                style={{position: 'absolute', bottom: 2, right: 8}}
                onPress={() => {
                  this.setState(previousState => ({
                    pomoc: !previousState.pomoc,
                    isRawVisible: true,
                  }))
                
                }}
              >
                <Image source={require('../../imgs/Chatdugme.png')} style={{width: 50, height: 50}}/>
              </TouchableOpacity>
            </View>
          ) : (
            <View >
              <View style={{ }}>
              {
                this.state.isRawVisible ?
                <RawText 
                hideRaw = {()=>{
                  this.rawHide();
                }}
              />
              :
              null
              }
              </View>
              <View style={{ width: responsiveWidth(100), height:342 }}>
                <LiveQuestion 
                  addQuestion = {() => this.letsMutatesAddQuestion(titleQuestion, textQuestion)}
                />
              </View>
            </View>
          )}
      </View>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default withRouter(connect((state) => ({
  liveActive: state.liveActive,
  userProfile: state.userProfile,
  visibleLive: state.liveIsVisible,
  locationId: state.locationId  
}), mapDispatchToProps)(LiveContainer));

