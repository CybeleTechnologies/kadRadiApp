import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from "../CommonDumb/Loader";
import CategoryListItem from "../CommonDumb/ListItem/CategoryListItem"
import ObjectList from "./ObjectList"
@graphql(
  gql` query objectArray($ids: [Int]) {
    objectArray(ids: $ids){
      name
      objectLocations{
        address
      }
      objectCategory{
        name
      }
      shortDescription
      ratingCount
      avgRating
      id
      images{
        profileImage {
          fileUrl
          desc
        }
      }
    }
  }`,
  {
    options: (props) => ({
      variables: {
        ids: props.arr,
      },
      fetchPolicy: 'network-only'
    })
  }
)

class MyCheckedPlace extends Component {
  render() {
    let {data} = this.props || [];
    let {objectArray} = data || [];
    return (
     
     <View style={{flex: 1, backgroundColor: 'white'}}>
        {
          this.props.data.loading ? 
          <View>
            <Loader />
          </View>
          :
          <View>
            {
              data.objectArray.map((item, key) => (
                <View>
                  <ObjectList 
                    name={item.name}
                    imgUrl={item.images.profileImage.fileUrl}
                    isWorking={item.isWorking}
                    avgRating = {item.avgRating}
                    reviewNumber={item.ratingCount}
                    categoryName={item.objectCategory.name}
                    locations={"item.objectLocations.address"}
                  />


                  {/* <CategoryListItem 
                    objectId={item.id}
                    key={key}
                    objectImg={item.images.profileImage.fileUrl}
                    avgRating={item.avgRating}
                    objectName={item.name}
                    reviewNumber={item.ratingCount}
                    categoryName={"s"}
                    isWorking={true}
                    locations={"object.objectLocations"}
                  /> */}
                </View>
              ))
            } 
          </View>
             
        }
      </View>
    );
  }
}

export default MyCheckedPlace;
