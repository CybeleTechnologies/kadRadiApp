import React from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { withRouter } from 'react-router-dom';

const style = StyleSheet.create({
  listItemTitle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: '#a6a6a6',
  },
})
const AllCategories = (props) => (
  <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
    <List containerStyle={{flexDirection: 'column',backgroundColor: "white", borderTopWidth: 0, justifyContent: 'flex-start',marginTop: 0}}>
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Laboratorije'}
        avatar={require('../../../imgs/icons/Laboratorije.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${2}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        avatar={require('../../../imgs/icons/Kafane.png')}
        title={'Kafane'}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${7}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Noćni Klubovi'}
        avatar={require('../../../imgs/icons/Klubovi.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${8}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Brza Hrana'}
        avatar={require('../../../imgs/icons/Brza-Hrana.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${10}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Hoteli'}
        avatar={require('../../../imgs/icons/Hoteli.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${12}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Cvećare'}
        avatar={require('../../../imgs/icons/Cvecare.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${14}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Šoping molovi'}
        avatar={require('../../../imgs/icons/Soping-Molovi.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${15}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Bioskopi'}
        avatar={require('../../../imgs/icons/Bioskopi.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${16}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Kladionice'}
        avatar={require('../../../imgs/icons/Kladionice.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${17}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Biletarnice'}
        avatar={require('../../../imgs/icons/Biletarnice.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${18}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Farbare'}
        avatar={require('../../../imgs/icons/Farbare.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${19}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Pozorišta'}
        avatar={require('../../../imgs/icons/Pozoriste.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${20}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Trafike'}
        avatar={require('../../../imgs/icons/Trafike.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${21}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Tehnika i Računari'}
        avatar={require('../../../imgs/icons/Tehnika-i-Racunari.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${22}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Butici'}
        avatar={require('../../../imgs/icons/Butici.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${23}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Saloni lepote'}
        avatar={require('../../../imgs/icons/Saloni-lepote.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${24}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Knjižare'}
        avatar={require('../../../imgs/icons/Knjizare.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${26}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Optike'}
        avatar={require('../../../imgs/icons/Optike.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${27}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Zanatske radnje'}
        avatar={require('../../../imgs/icons/Zanatske-radnje.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${28}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Pekare'}
        avatar={require('../../../imgs/icons/Pekare.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${29}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Muzeji'}
        avatar={require('../../../imgs/icons/Muzeji.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${30}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Pet Šopovi'}
        avatar={require('../../../imgs/icons/Pet-shopovi.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${31}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Veterinari'}
        avatar={require('../../../imgs/icons/Veterinari.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${32}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Auto Servisi'}
        avatar={require('../../../imgs/icons/Auto-Servisi.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${33}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Perionice'}
        avatar={require('../../../imgs/icons/Perionice.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${34}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Pumpe'}
        avatar={require('../../../imgs/icons/Pumpe.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
         props.history.push(`/category-items/${35}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Vulkanizeri'}
        avatar={require('../../../imgs/icons/Vulkanizeri.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${36}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Teretane'}
        avatar={require('../../../imgs/icons/Teretane.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${37}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Tereni i hale'}
        avatar={require('../../../imgs/icons/Tereni-I-Hale.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${38}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Sudovi'}
        avatar={require('../../../imgs/icons/Sudovi.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${39}`);
        }}
      />
      <ListItem
        roundAvatar={true}
        avatarOverlayContainerStyle={{
          borderColor: 'white',
          borderWidth: 1,
          backgroundColor: 'white'
        }}
        title={'Opštine'}
        avatar={require('../../../imgs/icons/Opstine.png')}
        chevronColor={'transparent'}
        titleStyle={style.listItemTitle}
        containerStyle={{borderTopColor: "white", borderBottomColor: "rgb(236, 236, 236)", borderBottomWidth: 0.5}}
        onPress={() => {
          props.history.push(`/category-items/${40}`);
        }}
      />
    </List>
  </ScrollView>
);
export default withRouter(AllCategories);