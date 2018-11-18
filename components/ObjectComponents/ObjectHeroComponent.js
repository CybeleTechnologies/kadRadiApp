import React from "react";
import { View } from "react-native";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../actions";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import ObjectHero from './ObjectComponentDumb/ObjectHero';
import {
  responsiveHeight,
  responsiveWidth
} from "react-native-responsive-dimensions";
import Loader from "../CommonDumb/Loader";

@withRouter
@graphql(
  gql`query objecCl($id: Int) {
    objectCl(id: $id) {
      images {
        profileImage {
          fileUrl
        }
      }
    }
  }`,
  {
    options: (props) => ({
      variables: {
        id: props.match.params.objectId,
      },
    }),
  },
)
class ObjectHeroComponent extends React.Component {
  render() {
    let [objectCl] = this.props.data.objectCl || [];
    return (
      <View style={{ flex: 1 }}>
        {
          this.props.data.loading?  <Loader /> : 
          <ObjectHero profileImage={objectCl.images.profileImage} />
        }
      </View>
    );
  }
}

export default ObjectHeroComponent;