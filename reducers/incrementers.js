import createReducer from '../lib/createReducer';
import * as types from '../actions/increment';

export const menuVisible = createReducer(false, {
  [types.MENU_VISIBLE](state, action) {
    return action.menuVisibile;
  },
});

export const recentlySeen = createReducer({ids: []}, {
  [types.IDS_RECENTLY](state, action) {
    return {
      ids: [...state.ids, action.idsRecently],
    };
  },
  [types.IDS_ARR](state, action) {
    return {
      ids: [...action.idsArray],
    };
  },
});

export const userProfile = createReducer({logedIn: false, id: 0}, {
  [types.ADD_ID_IN_STORE](state, action) {
    let { id, firstName, lastName, profileImageUrl, token, email, friends, photos, checkedPlaces, favorites} = action;
    return {
      ...state,
      id,
      firstName,
      lastName,
      profileImageUrl,
      logedIn: true,
      token,
      email,
      friends,
      photos,
      checkedPlaces,
      favorites,
    };
  },
  [types.LOGOUT_USER](state, action) {
    return {};
  },
  [types.ADD_TOKEN](state, action) {
    return {
      ...state,
      token: action.token,
    }
  },
  [types.CHANGE_PROFILE_IMG](state, action) {
    return {
      ...state,
      profileImageUrl: action.img
    }
  }
})

export const userLocation = createReducer({locationGranted: false}, {
  [types.LOCATION_ADD](state, action) {
    const { locationGranted } = action;
    return {
      ...state,
      locationGranted,
    };
  },
  [types.LOCATION_COORDINATES](state, action) {
    const { coordinates } = action;
    return {
      ...state,
      coordinates,
    };
  },
});

export const searchedString = createReducer('', {
  [types.SEARCH_STRING](state, action) {
    return {
      string: action.string,
    };
  },
});
export const locationId = createReducer({ id: 1 }, {
  [types.LOCATION_ID](state, action) {
    return {
      id: action.id,
    };
  },
});

export const sortObjectBy = createReducer({
  sort: false,
  by: '',
  kako: '',
}, {
  [types.SORT_BY](state, action) {
    return {
      sort: action.sort,
      by: action.by,
      kako: action.kako,
    };
  },
});

export const liveActive = createReducer({
  activeId: 1,
  searchString: '',
}, {
  [types.ACTIVE_LIVE](state, action) {
    return { ...action.activeLive };
  },
});

export const activeButtonContainer = createReducer({
  workingNow: false,
  nearMe: true,
}, {
  [types.ACTIVE_BUTTON_CONTAINER](state, action) {
    return {
      ...state,
      nearMe: action.nearMe,
    };
  },
  [types.ACTIVE_BUTTON_CONTAINER_WORK](state, action) {
    return {
      ...state,
      workingNow: action.workingNow,
    };
  },
});

export const liveIsVisible = createReducer({
  open: false,
}, {
  [types.LIVE_VISIBLE](state, action) {
    return {
      open: action.open,
    };
  },
});

export const viewThisProfile = createReducer({

}, {
  [types.VIEW_PROFILE](state, action) {
    return {
      ...action.data,
    };
  },
});

export const reviewsInfo = createReducer({ 
  workingTimeTruth: false,
  ratingPrice: 0,
  ratingReview: 0,
  reviewText: '',
  img: '',
  idReview: 0,
}, {
  [types.REVIEWS_INFO](state, action) {
    return {
      ...state,
      workingTimeTruth: action.time,
      ratingPrice: action.ratingPrice,
      ratingReview: action.ratingReview,
      reviewText: action.text,
      idReview: action.id,
    };
  },
  [types.REVIEWS_IMG](state, action) {
    return {
      ...state,
      img: action.img,
    };
  },
});

export const chatProfile = createReducer({
}, {
  [types.CHAT_WITH](state, action) {
    return {
      ...action.data,
    };
  },
});

export const selectedIndexView = createReducer({
  selectedIndex: 0,
}, {
  [types.SELECTED_BUTTON_CONTAINER](state, action) {
    return {
      selectedIndex: action.selectedIndex,
    };
  },
});
