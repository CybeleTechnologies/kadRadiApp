import React from 'react';
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CategoryBox from './CategoryBox';
import TextFont from 'TextFont';
type State = {
  width: number,
  height: number,
}

@withRouter
@connect((state) => {return {
  menuVisible: state.menuVisible,
  userProfile: state.userProfile,
  }}, mapDispatchToProps)

class CategoryContainer extends React.Component<State> {
  constructor(props) {
    super(props);
    this.state = {
      viewMore: false,
    }
  }
  giveMeMore = () => {
    this.props.history.push('/allCategory')
  }
  render() {
    return (
      <View style={{width: responsiveWidth(100), height: responsiveHeight(52), flexDirection: 'column'}}>
        <View style={{ width: responsiveWidth(100), height: responsiveHeight(17), flexDirection: 'row',  zIndex: -1, marginTop: -15}}>
          <CategoryBox id={1} catName="Apoteke" iconPlaceholder={require('../../../imgs/category-icons/Apoteke@3x.png')} to={'/category-items/1'} />
          <CategoryBox id={2} catName="Klinike" iconPlaceholder={require('../../../imgs/category-icons/Klinike.png')} to={'/category-items/2'} />
          <CategoryBox id={4} catName="Menjačnice" iconPlaceholder={require('../../../imgs/category-icons/Menjacnice.png')} to={'/category-items/4'} />
        </View>
        <View style={{ width: responsiveWidth(100), height: responsiveHeight(17), flexDirection: 'row',}}>
          <CategoryBox id={5} catName="Bankomati" iconPlaceholder={require('../../../imgs/category-icons/Bankomati.png')} to={'/category-items/5'} />
          <CategoryBox id={6} catName="Restorani" iconPlaceholder={require('../../../imgs/category-icons/Restorani.png')} to={'/category-items/6'} />
          <CategoryBox id={7} catName="Kafići" iconPlaceholder={require('../../../imgs/category-icons/Kafici.png')}  to={'/category-items/7'} />
        </View>
        <View style={{ width: responsiveWidth(100), height: responsiveHeight(17), flexDirection: 'row', }}>
          <CategoryBox id={9} catName="Marketi" iconPlaceholder={require('../../../imgs/category-icons/Marketi.png')} to={'/category-items/9'} />
          <CategoryBox id={10} catName="Hoteli" iconPlaceholder={require('../../../imgs/category-icons/Hoteli.png')} to={'/category-items/10'} />
          <CategoryBox id={11} catName="Operateri" iconPlaceholder={require('../../../imgs/category-icons/Operateri.png')} to={'/category-items/11'} />
        </View>
          <TouchableOpacity 
            style={{width: '100%', height: responsiveHeight(4), alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
            onPress={() => {
              this.giveMeMore();
            }}
          >
          <View style={{flexDirection: 'row'}}>
            <TextFont style={{ fontSize: 15 }} semiBold>Vise kategorija</TextFont>
            <Image 
              source={require('../../../imgs/bottomArrow.png')}
              style={{width: 25, height: 25 }}
            />
          </View>
          </TouchableOpacity>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default CategoryContainer;
