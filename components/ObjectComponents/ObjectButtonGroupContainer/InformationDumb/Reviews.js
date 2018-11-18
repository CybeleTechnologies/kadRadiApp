import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../../actions';
import Loader from '../../../CommonDumb/Loader';
import RewItem from '../MostImportantDumb/MostImportantReviews/RewItem';
import _ from 'lodash';
import BigButton from '../../../CommonDumb/BigButton';
const load = false;
@withRouter
@graphql(
  gql`
    query ObjectReview($objectClId: Int!, $page: Int, $token: String) {
      ObjectReview(objectClId: $objectClId, page: $page, token: $token) {
        id
        textReview
				rating
        maxPages
        image
        photoCount
        person {
          lastName
          firstName
          profileInfo {
            profileImageUrl
            stars
            photos
            followers
          }
        }
        likes {
          super
          hvala,
          beskorisno
          myLike
        }
      }
    }
  `,
  {
    options: (props) => {
      return ({
      variables: {
        objectClId: parseInt(props.objectId),
        page: 1,
        token: props.userProfile.token,
      },
      fetchPolicy: 'network-only'
    })}
  }
)
@graphql(
  gql`mutation addLike($token: String!, $objectReviewId: Int!, $likeType: Int!) {
    addLike(token: $token, objectReviewId: $objectReviewId, likeType: $likeType) {
      success,
      error
    }
  }`, 
  {
    name: 'addLike',
  }
)
@graphql(
  gql`mutation removeLike($token: String!, $objectReviewId: Int!) {
    removeLike(token: $token, objectReviewId: $objectReviewId) {
      success,
      error
    }
  }`, 
  {
    name: 'removeLike',
  }
)
class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page : 1,
						reviews: [],
						load: false,
						maxPages: '',
        }
    }
    nextPage = async () => {
				this.setState({
					load: true,
				})	
				let myPage = this.state.page;
				let nextPage = myPage + 1;
				let newReview = await this.props.data.refetch({objectClId: this.props.objectId, page: nextPage});
				if(!_.isEqual(this.state.reviews, newReview.data.ObjectReview)) {
					this.setState(previousState => ({
						page: nextPage,
						reviews: [...previousState.reviews, ...newReview.data.ObjectReview],
						load: false,
					}));
				}
      }
    componentWillReceiveProps(nextProps) {
      if(!this.state.reviews.length) {
        if(nextProps.data.ObjectReview != 'undefined' && !nextProps.data.loading && nextProps.data.ObjectReview.length) {
					this.setState({
						reviews: nextProps.data.ObjectReview,
						maxPages: nextProps.data.ObjectReview[0].maxPages
					});
				}
      }
    }
    mutationLikes = async (id, likeType) => {
      let { userProfile } = this.props;
      let go = await this.props.addLike({
        variables: {
          token:  userProfile.token,
          objectReviewId: id,
          likeType: likeType,
        }
      });
      if(go.data.addLike.success) {
        ToastAndroid.show('Hvala na oceni', ToastAndroid.SHORT);
        let reee = await this.props.data.refetch({
          objectClId: parseInt(this.props.objectId),
          page: 1,
          token: userProfile.token,
        });
        this.setState({
          page: 1,
          reviews: reee.data.ObjectReview,
          maxPages: reee.data.ObjectReview[0].maxPages
        })
      }
    }
    mutationDislike = async ( id ) => {
      let { userProfile } = this.props;
      let lets = await this.props.removeLike({
        variables: {
          token: userProfile.token,
          objectReviewId: id,
        }
      })
      if (lets.data.removeLike.success) {
        ToastAndroid.show('Uspešno obrisana ocena', ToastAndroid.SHORT);
        let ree = await this.props.data.refetch({
          objectClId: parseInt(this.props.objectId),
          page: 1,
          token: userProfile.token,
        });
        this.setState({
          page: 1,
          reviews: ree.data.ObjectReview,
          maxPages: ree.data.ObjectReview[0].maxPages,
        })
      }
    }
    render() {
        return(
            <View>
            {
                this.state.reviews.length?
                this.state.reviews.map((item,key) =>(
                  <RewItem objectReview={item}  key={key}
                    likeMe={this.mutationLikes}
                    mutationDislike={this.mutationDislike}
                    info
                    withoutBorder={{
                      flexDirection: 'column', 
                      width: '100%', 
                      borderBottomColor: '#a9a9a9', 
                      borderBottomWidth: 1,
                  }}/>
                ))
                :
                <Text>Nemamo utiske</Text>
						}
						{
							this.state.load && (
								<Loader/>
							)
						}
            <View style={{flexDirection: 'column',alignContent: 'center', justifyContent: 'center', alignItems: 'center', }} >
							{
								this.state.page < this.state.maxPages?
								<TouchableHighlight
									onPress={()=> {
										this.nextPage();
									}} 
									style={{width: '100%', alignContent: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}
								>
									<Image source={require('../../../../imgs/bottomArrow.png')} resizeMode={'center'} style={{width: 30, height: 30, alignSelf: 'center'}}/>
								</TouchableHighlight>: null
							}
              <BigButton
                onAction={() => this.props.history.push(`/add-comment/${this.props.match.params.objectId}`)} 
                title={'Dodaj svoj utisak'} 
                containerStyle={{
                  width: '95%',
                  marginLeft: '2.5%',
                  marginRight: '2.5%',
                  height: 60,
                  borderWidth: 1,
                  borderColor: '#a9a9a9', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  backgroundColor: '#e2303d',
                  marginTop: '2.5%',
                  marginBottom: '5%',
              }}/>
            </View>
					</View>
        );
    }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(({ userProfile }) => ({
    userProfile,
  }), mapDispatchToProps)(Reviews);