import React from 'react';
import { View } from 'react-native';
import { Route, Switch } from 'react-router-native';
import { ConnectedRouter } from 'react-router-redux';
import Header from '../components/Headers/Header';
import Master from '../components/Master';
import CategoryContainer from '../components/Categories/CategoryContainer';
import MenuShell from  '../components/MenuComponents/MenuShell';
import BackButtonCybele from '../lib/BackButtonCybele';
import ObjectContainer from '../components/ObjectComponents/ObjectContainer';
import MyProfile from '../components/MyProfile/MyProfile';
import AddReview from '../components/AddReview/ReviewContainer';
import AddYourObject from '../components/AddToYourObject/AddYourObject';
import FooterContainer from '../components/CommonDumb/FooterContainer';
import UserMakeAcc from '../components/UserRegistration/UserMakeAcc';
import LiveResponse from '../components/Live/LiveResponse';
import RecentlyContainer from '../components/RecentlySeen/RecentlyContainer';
import MapViewContainerCategory from '../components/MapView/MapViewContainerCategory';
import NotifyContainer from '../components/Notifications/NotifyContainer';
import SearchContainer from '../components/Search/SearchContainer';
import MapViewContainerSearch from '../components/MapView/MapViewContainerSearch';
import MapViewContainerRecently from '../components/MapView/MapViewContainerRecently';
import SearchedProfile from '../components/FriendsProfile/SearchedProfile';
import LiveContainer from '../components/Live/LiveContainer';
import GetCoords from '../components/GetCoordinates/GetCoords';
import MapViewContainerNearMe from '../components/MapView/MapViewContainerNearMe';
import LiveQuestion from '../components/Live/LiveQuestion';
import LiveQuestionDetail from '../components/Live/LiveQuestionDetail';
import MapViewFindMe from '../components/MapView/MapViewFindMe';
import MyObjectList from '../components/ObjectComponents/MyObjects/MyObjectList';
import MyObjectPage from '../components/ObjectComponents/MyObjects/MyObjectPage';
import MyObjectWorkTimeEdit from '../components/ObjectComponents/MyObjects/MyObjectWorkTimeEdit';
import FavoriteObject from '../components/FavoriteObjects/FavoriteObject';
import MapViewFavoriteObjects from '../components/MapView/MapViewFavoriteObjects';
import LiveQuestionsSendAnswer from '../components/Live/LiveQuestionsSendAnswer';
import ChatContainer from '../components/Chat/ChatContainer';
import Inbox from '../components/Chat/Inbox';
import NewChat from '../components/Chat/NewChat';
import AllCategories from '../components/MasterDumb/HomepageDumb/AllCategories';
import MySpecialDate from '../components/ObjectComponents/MyObjects/MySpecialDate';

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return(
      <ConnectedRouter history={this.props.history}>
        <BackButtonCybele>
          <GetCoords>
            <MenuShell>
              <Header />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}
              >
                <Switch>
                  <Route exact path="/" component={Master} />
                  <Route path="/category-items/:categoryId" component={CategoryContainer} />
                  <Route path="/object-page/:objectId" component={ObjectContainer} />
                  <Route path="/add-comment/:objectId" component={AddReview} />
                  <Route path="/myProfile" component={MyProfile} />
                  <Route path="/addToYourObject/:objectId" component={AddYourObject} />
                  <Route path="/registration" component={UserMakeAcc} />
                  <Route path="/live-response/:subject" component={LiveResponse} />
                  <Route path="/live-question-detail/:subjectQuestion" component={LiveQuestionDetail} />
                  <Route path="/recently" component={RecentlyContainer} />
                  <Route path="/maps-view/:categoryId" component={MapViewContainerCategory} />
                  <Route path="/notifications" component={NotifyContainer} />
                  <Route path="/search" component={SearchContainer} />
                  <Route path="/map-view-search/:searchString" component={MapViewContainerSearch} />
                  <Route path="/map-view-recently" component={MapViewContainerRecently} />
                  <Route path="/friendsProf" component={SearchedProfile} />
                  <Route path="/live-container" component={LiveContainer} />
                  <Route path="/maps-view-nearMe/:categoryId" component={MapViewContainerNearMe} />
                  <Route path="/live-questions/:questionId" component={LiveQuestion} />
                  <Route path="/find-me/:lat/:lng/:name/:address" component={MapViewFindMe} />
                  <Route path="/my-object-list/" component={MyObjectList} />
                  <Route path="/my-object-page/:myObjectId" component={MyObjectPage} />
                  <Route path="/my-object-time/:myObjectTimeId" component={MyObjectWorkTimeEdit} />
                  <Route path="/favoriteObject" component={FavoriteObject} />
                  <Route path="/maps-view-favoriteObjects" component={MapViewFavoriteObjects} />
                  <Route path="/send-answers/:sendAnswersId" component={LiveQuestionsSendAnswer} />
                  <Route path="/chat/:id" component={ChatContainer} />
                  <Route path="/inbox" component={Inbox} />
                  <Route path="/newChat" component={NewChat} />
                  <Route path="/allCategory" component={AllCategories} />
                  <Route path="/my-object-special-date/:myObjectId" component={MySpecialDate} />
                </Switch>
                <FooterContainer />
              </View>
            </MenuShell>
          </GetCoords>
        </BackButtonCybele>
      </ConnectedRouter>

    )
  }
}
