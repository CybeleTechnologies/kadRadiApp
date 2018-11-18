import * as increment from './increment.js';
import { push } from 'react-router-redux';
import {
  AsyncStorage,
} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import { check } from 'graphql-anywhere';
const { FBLogin, FBLoginManager, } = require('react-native-facebook-login');

export function menuVisibile(): any {
  return (dispatch: mixed, getState: mixed): any => {
    let monus: mixed = getState();
    if(!monus.menuVisible) {
      dispatch(menuVisibility(true));
    } else {
      dispatch(menuVisibility(false));
    }
  }
}

export function changeLocationId(id) {
  return {
    type: increment.LOCATION_ID,
    id
  }
}

export function addInLiveActiveId(liveCatId) {
  return async (dispatch, getState) => {
    const { liveActive } = getState();
    const activeLiveNew = {...liveActive, activeId: liveCatId};
    dispatch(liveActiveAction(activeLiveNew));
  }
}

export function addInLiveActiveSearchString(liveSearchString) {
  return (dispatch, getState) => {
    const { liveActive } = getState();
    const activeLiveSearchString = {...liveActive, searchString: liveSearchString};
    dispatch(liveActiveAction(activeLiveSearchString));
  }
}

export function liveActiveAction(activeLive) {
  return {
    type: increment.ACTIVE_LIVE,
    activeLive,
  }
}

export function menuVisibileNo():any {
  return(dispatch, getState) => {
    dispatch(menuVisibility(false));
  }
}

export function menuVisibility(menuVis: boolean):any {
  return {
    type: increment.MENU_VISIBLE,
    menuVisibile: menuVis,
  }
}

export function changeMenu(change: boolean): any {
  return(dispatch, getState) => {
      dispatch(menuVisibility(change))
  }
}

export function userId(id: number, firstName: string, lastName: string, profileImageUrl: string, token: string, email: string, friends: mixed, photos: int, checkedPlaces: int, favorites: int) {
  return async (dispatch, getState) => {
    if(token == null) {
      let token = await AsyncStorage.getItem('userToken');
      dispatch(changeUserID(id, firstName, lastName, profileImageUrl, token, email, friends, photos, checkedPlaces, favorites));
    } else {
      dispatch(changeUserID(id, firstName, lastName, profileImageUrl, token, email, friends, photos, checkedPlaces, favorites));
    }
  }
}
export function userSetToken(token) {
  return (dispatch, getState) => {
    dispatch(addToken(token));
  }
}
export function addToken(token) {
  return {
    type: increment.ADD_TOKEN,
    token,
  }
}

export function addIdsActions(id) {
  return async (dispatch, getState) => {
    let recently = getState().recentlySeen;
    let getThis = await AsyncStorage.getItem('idsRecently');
    if(getThis != null) {
      let makeArr = JSON.parse(getThis);
      if (makeArr.includes(id)) {
        makeArr = makeArr.filter(item => item !== id);
      }
      makeArr.unshift(id);
      let getSlice = makeArr.slice(0, 15);
      dispatch(addIdsArray(getSlice));
      let setThis = await AsyncStorage.setItem('idsRecently', JSON.stringify(getSlice));
    } else {
      await AsyncStorage.setItem('idsRecently', JSON.stringify([id]));
    }

  }
}

export function addIds(idsRecently) {
  return {
    type: increment.IDS_RECENTLY,
    idsRecently,
  }
}

export function freshStartRecently() {
  return async (dispatch, getState) => {
    let getThis = await AsyncStorage.getItem('idsRecently');
    if (getThis != null) {
      let resultFinal = JSON.parse(getThis);
      dispatch(addIdsArray(resultFinal)); 
    }
  }
}

export function addIdsArray(idsArray) {
  return {
    type: increment.IDS_ARR,
    idsArray,
  }
}
export function changeUserID(id: number, firstName: string, lastName: string, profileImageUrl: string, token: string, email: string, friends: mixed, photos: int, checkedPlaces: int, favorites: int): any {
  return {
    type: increment.ADD_ID_IN_STORE,
    id,
    firstName,
    lastName,
    profileImageUrl,
    token,
    email,
    friends,
    photos,
    checkedPlaces,
    favorites
  }
}
export function logout(): any {
  return async (dispatch, getState) => {
      try {
        await GoogleSignin.signOut();
      } catch(err) {
        console.log("err", err);
      }
      await FBLoginManager.logout((err) =>{
        if(err) {
          console.log("error logout",err);
        }
      })
    dispatch(logoutUser());
  }
}
export function logoutUser(): any {
  return {
    type: increment.LOGOUT_USER,
    user: {},
  }
}
export function changeProfImg(img): any {
  return {
    type: increment.CHANGE_PROFILE_IMG,
    img,
  }
}
export function locationGrant(locationGranted: boolean): void {
  return (dispatch, getState) => {
    dispatch(grantLocation(locationGranted));
  }
}
export function grantLocation(locationGranted: boolean): void {
  return {
    type: increment.LOCATION_ADD,
    locationGranted,
  }
}
export function getCoordsAction(coordinates: mixed): mixed {
  return (dispatch, getState) => {
    dispatch(getCoords(coordinates));
  }
}
export function getCoords(coordinates: mixed): any {
  return {
    type: increment.LOCATION_COORDINATES,
    coordinates
  }
}
export function setSearchString(string: mixed): void {
  return {
    type: increment.SEARCH_STRING,
    string
  }
}
export function sortBy(sort: boolean, by: string, kako: string): void {
  return {
    type: increment.SORT_BY,
    sort,
    by,
    kako
  }
}
export function selectButtonNearMe(nearMe: boolean): void {
  return {
    type: increment.ACTIVE_BUTTON_CONTAINER,
    nearMe
  }
}

export function selectButtonWorkingNow(workingNow: boolean): void {
  return {
    type: increment.ACTIVE_BUTTON_CONTAINER_WORK,
    workingNow
  }
}

export function liveVisible(open: boolean, ): void {
  return {
    type: increment.LIVE_VISIBLE,
    open,
  }
}

export function viewProfile(data: mixed): void {
  return {
    type: increment.VIEW_PROFILE,
    data,
  }
}

export function addReview(time: boolean, ratingPrice: Int, ratingReview: Int, text: string, id: Int) {
  return (dispatch, getState) => {
    dispatch(storeReview(time, ratingPrice, ratingReview, text, id));
  }
}
export function addImageInReview(img) {
  return {
    type: increment.REVIEWS_IMG,
    img,
  }
}
export function storeReview(time: boolean, ratingPrice: Int, ratingReview: Int, text: string, id: Int) {
  return {
    type: increment.REVIEWS_INFO,
    time,
    ratingPrice,
    ratingReview,
    text,
    id,
  }
}

export function chatWith(data: mixed): void {
  return {
    type: increment.CHAT_WITH,
    data,
  }
}

export function changeButton(selectedIndex: int): void {
  return {
    type: increment.SELECTED_BUTTON_CONTAINER,
    selectedIndex,
  }
}
