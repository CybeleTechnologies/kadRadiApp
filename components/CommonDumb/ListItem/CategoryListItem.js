import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { withRouter } from 'react-router-dom';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ListItemTitle from './ListItemTitle';
import ListItemReview from './ListItemReview';
import ListItemSub from './ListItemSub';
import WorkOrNotClock from './WorkOrNotClock';
@withRouter
class CategoryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      objectName: 'Nepoznato',
      keyId: 0,
      reviewNumber: 0,
      categoryName: 'Default',
    }
  }
  render() {
    let {id, objectId, objectImg, keyId, objectName, reviewNumber, categoryName, isWorking, avgRating, locations} = this.props;
    let {workingNowImg, notWorkingNowImg, titleIcon} = this.state;
    return (
      <TouchableOpacity onPress={() => {
        this.props.addIdsAction(objectId);
        this.props.history.push(`/object-page/${objectId}`);
      }}>
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.objImage}
              source={{ uri: objectImg }} />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.contentSub}>
              <ListItemTitle
                keyId={keyId}
                objectName={objectName}
              />
              <ListItemReview
                reviewNumber={reviewNumber}
                avg={avgRating} />
              <View style={styles.subTitleContainer}>
                <ListItemSub
                  categoryName={categoryName}
                  locations={locations}
                  />
                <WorkOrNotClock
                 isWorking={isWorking}
                 containerStyle={{alignSelf: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end'}}
                 imgStyle={{width: responsiveHeight(9.4), height: responsiveHeight(9.4), alignSelf: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end'}}/>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(21),
    borderBottomColor: 'rgb(108, 108, 108);',
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  imgContainer: {
    width: responsiveWidth(41),
    height: responsiveHeight(21),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  objImage: {
    width: responsiveWidth(40),
    height: responsiveHeight(20),
  },
  contentContainer: {
    width: responsiveWidth(52),
    height: responsiveHeight(21),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentSub: {
    width: responsiveWidth(50),
    height: responsiveHeight(18),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  subTitleContainer: {
    width: responsiveWidth(55),
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
});

export default CategoryListItem;
