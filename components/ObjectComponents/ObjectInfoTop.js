
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Loader from '../CommonDumb/Loader';
import ObjectHero from './ObjectComponentDumb/ObjectHero';
import MainClock from './ObjectComponentDumb/ObjectClockMain';
import ObjectName from './ObjectComponentDumb/ObjectName';
import ObjectCategory from './ObjectComponentDumb/ObjectCategory';
import ObjectWorkingHours from './ObjectComponentDumb/ObjectWorkingHours';
import ObjectAdditionalInfo from './ObjectComponentDumb/ObjectAdditionalInfo';
import ObjectRating from './ObjectComponentDumb/ObjectRating';

type State = {
  width: number,
  height: number,
}

@withRouter
@graphql( 
  gql`query objectCl($id: Int) {
    objectCl(id: $id){
      name
      avgRating
      ratingCount
      objectCategory {
        name
      }
      workingTimeInfo {
        isWorking
      }
      favorites{
        favoritesCount
      }
      checkedIn {
        checkedInCount
      }
    }
  }`,
  {
    options: ({objectId}) => ({
      variables: {
        id: objectId,
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
    })
  }
)
class ObjectInfoTop extends React.Component<State> {
  async componentDidMount() {
    await this.props.data.refetch();
  }
	render() {
    let [objectCl] = this.props.data.objectCl || [];
    let { workingTimeInfo } = objectCl || {};
    return (
				<View>
          {
            this.props.data.loading || workingTimeInfo.isWorking === 'undefined' ? <Loader /> :
            <View>
              <MainClock isWorking={workingTimeInfo.isWorking} />
					    <ObjectName name={objectCl.name}/>
					    <ObjectCategory category={objectCl.objectCategory.name} />
              <ObjectRating objectClRating={objectCl.avgRating}/>
              <ObjectAdditionalInfo checkIn={objectCl.checkedIn.checkedInCount} fav={objectCl.favorites.favoritesCount} count={objectCl.ratingCount} />
            </View>
          }
        </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default ObjectInfoTop;
