import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Image,
} from 'react-native';
import TextFont from '../../../TextFont';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Button } from 'react-native-elements';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../actions';
import { withRouter } from 'react-router-dom';
import Loader from '../../CommonDumb/Loader';
import BigButton from '../../CommonDumb/BigButton';
import Modal from 'react-native-modal';
import MyObjectSectorTime from './MyObjectSectorTime';

@withRouter
@connect((state) => {return {
  userProfile: state.userProfile,
  }}, mapDispatchToProps)

@graphql(
  gql` query objectCl($id: Int) {
    objectCl(id: $id){
      name
      id
      objectInfo{
        websiteUrl
        popularBecauseOf
        phone {
          number
        }
      }
      sectorTimeInfo {
        name
        id
        monday{
          opening
          closing
        }
        tuesday{
          opening
          closing
        }
        wednesday{
          opening
          closing
        }
        thursday{
          opening
          closing
        }
        friday{
          opening
          closing
        }
        saturday{
          opening
          closing
        }
        sunday{
          opening
          closing
        }
      }
    }
  }`,
  {
    options: (props) => ({
      variables: {
        id: props.match.params.myObjectId,
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
    })
  }
)
@graphql(
  gql`mutation objectUpdate($object: String!, $token: String!) {
    objectUpdate(object: $object, token: $token) {
      success
      error
    }
  }`, 
  {
    name: 'updateMutation',
  }
)
@graphql(
  gql`mutation createSector($name: String!, $objectClId: Int!, $token: String!) {
    createSector(name: $name, objectClId: $objectClId, token: $token) {
      success
      error
    }
  }`, 
  {
    name: 'addSector',
  }
)
@graphql(
  gql`mutation renameSector($name: String!, $objectClId: Int!, $token: String!, $sectorId: Int!) {
    renameSector(name: $name, objectClId: $objectClId, token: $token, sectorId: $sectorId) {
      success
      error
    }
  }`, 
  {
    name: 'renameMe',
  }
)
@graphql(
  gql`mutation deleteSector($objectClId: Int!, $token: String!, $sectorId: Int!) {
    deleteSector(objectClId: $objectClId, token: $token, sectorId: $sectorId) {
      success
      error
    }
  }`, 
  {
    name: 'deleteMe',
  }
)
class MyObjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objectToSend: {
        name: '',
        id: 0,
        phone: '',
        popularBecauseOf: '',
        website: '',   
        modalVisible: false,
        newSectorName: '',
        editTime: false,
        editName: '',
        editTimeObj: {}
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.data.loading && nextProps.data.objectCl.length) {
      let [nextVal] = nextProps.data.objectCl || [];
      let [phone] = nextVal.objectInfo.phone || [];
        this.setState(prevState => ({
          objectToSend : {
            ...prevState.objectToSend,
            id: nextVal.id,
            name: nextVal.name,
            phone: phone !== undefined ? phone.number : '',
            popularBecauseOf: nextVal.objectInfo.popularBecauseOf,
            website: nextVal.objectInfo.websiteUrl,
          }
        }));
    }
  }

  letsMutate = async () => {
    let {token} = this.props.userProfile;
    let obj = JSON.stringify(this.state.objectToSend);
    let mutation = await this.props.updateMutation(
      {
        variables: {
          token: token,
          object: obj,
        }
      }
    )
    if (mutation.data.objectUpdate.success) {
      ToastAndroid.show("Upesno sačuvane izmene!", ToastAndroid.SHORT)
    } else {
      ToastAndroid.show("Promene nisu sačuvane!", ToastAndroid.SHORT)
    }
  }

  addNewSector = async () => {
    let { token } = this.props.userProfile;
    let { myObjectId } = this.props.match.params;
    let { data } = await this.props.addSector(
      {
        variables: {
          name: this.state.newSectorName,
          token,
          objectClId: myObjectId,
        }
      }
    );
    if (data.createSector.success) {
      ToastAndroid.show("Upesno sačuvan novi sektor!", ToastAndroid.SHORT)
      this.setState({
        modalVisible: false,
      })
      await this.props.data.refetch({
        id: myObjectId,
      });
    } else {
      ToastAndroid.show("Promene nisu sačuvane!", ToastAndroid.SHORT)
      this.setState({
        modalVisible: false,
      })
    }
  }
  closeModal = () => {
    this.setState({
      modalVisible: false,
      editTime: false,
    })
  }
  sectorChangeName = async (id) => {
    let {token} = this.props.userProfile;
    let { myObjectId } = this.props.match.params;
    let mutation = await this.props.renameMe(
      {
        variables: {
          name: this.state.newSectorName,
          objectClId: myObjectId,   
          token: token,
          sectorId: id,
        }
      }
    )
    this.closeModal();
    if (mutation.data.renameSector.success) {
      ToastAndroid.show("Upesno promenjeno ime sektora!", ToastAndroid.SHORT)
      await this.props.data.refetch({
        id: myObjectId,
      });
    } else {
      ToastAndroid.show("Promene nisu sačuvane!", ToastAndroid.SHORT)
    }
  }
  reload = async () => {
    let { myObjectId } = this.props.match.params;
    await this.props.data.refetch({
      id: myObjectId,
    })
  }
  sectorDelete = async (id) => {
    let { token } = this.props.userProfile;
    let { myObjectId } = this.props.match.params;
    let muta = await this.props.deleteMe(
      {
        variables: {
          objectClId: myObjectId,
          token,
          sectorId: id,
        }
      }
    )
    if (muta.data.deleteSector.success) {
      ToastAndroid.show("Upesno obrisan sektor!", ToastAndroid.SHORT)
      await this.props.data.refetch({
        id: myObjectId,
      });
    } else {
      ToastAndroid.show("Promene nisu sačuvane!", ToastAndroid.SHORT)
    }
  }
  render() {
    let [ first ]  = this.props.data.objectCl || [];
    let { sectorTimeInfo } = first || [];
    return(
        this.props.data.loading 
        ?
        <Loader />
        :
        <View style={{ backgroundColor: 'rgb(43, 157, 157)', flex: 1, alignContent: 'center', alignItems: 'center'}}>
          <Modal
            isVisible={this.state.modalVisible}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
            >
              <View style={{ flex: 1, alignContent: 'center', alignItems: 'center',justifyContent: 'center'}}>
                <TouchableOpacity 
                  onPress={() => {
                    this.setState({
                      modalVisible: false,
                      editTime: false,
                    })
                  }}
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 2,
                    zIndex: 99,
                  }}
                >
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}> X </Text>
                </TouchableOpacity>
                <TextFont style={{ textAlign: 'center', fontSize: 16, color: 'white', }}>Naziv sektora:</TextFont>
                <TextInput
                  disableFullscreenUI
                  style={style.inputStyle}
                  value={this.state.editTime ? this.state.newSectorName : null}
                  onChangeText={(name) => {
                    this.setState({
                      newSectorName: name,
                    });
                  }}
                />
                <View style={{marginTop: 20, width: '100%', flex: 1}}>
                  {
                    this.state.editTime ?
                    <View style={{ width: '100%'}}>
                    <BigButton
                      title="Promeni ime sektora"
                      onAction={() => {
                        this.sectorChangeName(this.state.editTimeObj.id);
                      }}
                    />
                    <MyObjectSectorTime ids={this.props.match.params.myObjectId} workingTimeSector={this.state.editTimeObj} close={this.closeModal} sectorId={this.state.editTimeObj.id} reloadMe={this.reload}/>
                    </View>
                    :
                    <BigButton
                      title="Sačuvaj novi sektor"
                      onAction={() => {
                        this.addNewSector();
                      }}
                    />
                  }
                </View>
              </View>
            </Modal>
              <View style={{ flexDirection: 'row', width: responsiveWidth(100), alignItems: 'center', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={{
                    width: responsiveWidth(50),
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={() => {
                    this.props.history.push(`/my-object-time/${this.state.objectToSend.id}`);
                  }}
                >
                  <TextFont style={{ fontSize: 16 }}>Radno vreme</TextFont>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: responsiveWidth(50),
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={() => {
                    this.props.history.push(`/my-object-special-date/${this.state.objectToSend.id}`);
                  }}
                >
                  <TextFont style={{ fontSize: 16 }}>Specificni datum</TextFont>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row',}}>
                <View>
                  <TextFont style={{ textAlign: 'center' }}>Naziv: </TextFont>
                  <TextInput
                    disableFullscreenUI
                    style={style.inputStyle}
                    value={this.state.objectToSend.name}
                    onChangeText={(name) => {
                      this.setState(prevState => ({
                        objectToSend : {
                          ...prevState.objectToSend,
                          name,
                        }
                      }));
                    }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <TextFont style={{ textAlign: 'center' }}>Telefon: </TextFont>
                  <TextInput
                    disableFullscreenUI
                    keyboardType = 'numeric'
                    style={style.inputStyle}
                    value={this.state.objectToSend.phone}
                    onChangeText={(phone) => {
                      this.setState(prevState => ({
                        objectToSend : {
                          ...prevState.objectToSend,
                          phone,
                        }
                      }));
                    }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <TextFont style={{ textAlign: 'center' }}>Popularan zbog: </TextFont>
                  <TextInput
                    disableFullscreenUI
                    style={style.inputStyle}
                    value={this.state.objectToSend.popularBecauseOf}
                    onChangeText={(popularBecauseOf) => {
                      this.setState(prevState => ({
                        objectToSend : {
                          ...prevState.objectToSend,
                          popularBecauseOf,
                        }
                      }));
                    }}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <TextFont style={{ textAlign: 'center' }}>Website: </TextFont>
                  <TextInput
                    disableFullscreenUI
                    style={style.inputStyle}
                    value={this.state.objectToSend.website}
                    onChangeText={(website) => {
                      this.setState(prevState => ({
                        objectToSend : {
                          ...prevState.objectToSend,
                          website,
                        }
                      }));
                    }}
                  />
                </View>
              </View>
              <View style={{marginTop: 20, width: responsiveWidth(100)}}>
                <BigButton
                  title="Snimi"
                  onAction={() => {
                    this.letsMutate();
                  }}
                />
              </View>
              <TextFont bold style={{ fontSize: 18}}>Sektori</TextFont>
              <ScrollView style={{width: '70%', alignContent: 'center'}}>
                {
                  !this.props.data.loading && sectorTimeInfo.length 
                  ? 
                  sectorTimeInfo.map((item,key) => (
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', height: 40}} key={key}>
                    <TouchableOpacity
                      style={{width: '75%'}}
                      onPress={() => {
                        this.setState({
                          editTime: true,
                          newSectorName: item.name,
                          modalVisible: true,
                          editTimeObj: item,
                        })
                      }}
                    >
                      <TextFont style={{ fontSize: 15}}>{item.name}</TextFont>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{width: '25%'}}
                      onPress={() => {
                        this.sectorDelete(item.id);
                      }}
                    >
                      <Image 
                        source={require('../../../imgs/falseWorkingTime.png')}
                        style={{width: '100%', height: 35}}
                        resizeMode={'center'}
                      />
                    </TouchableOpacity>
                    </View>
                  ))
                  :
                  <View style={{ flexDirection: 'column', width: '100%'}}>
                    <TextFont style={{ textAlign: 'center'}}>Trenutno nemamo sektore za ovaj objekat</TextFont>
                  </View>
                }
              </ScrollView>
              <View style={{position: 'absolute', right: '3%', bottom: 30}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      modalVisible: true,
                    })
                  }}
                >
                  <Image 
                    source={require('../../../imgs/Chatdugme.png')}
                    style={{width: 50, height: 50}}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              </View>
        </View>
      );
  }
}

const style = StyleSheet.create({
  inputStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
    paddingTop: 2,
    paddingBottom: 2,
    height: responsiveHeight(5),
    width: responsiveWidth(75),
    backgroundColor: 'white',
  },
  buttonStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 6,
    height: responsiveHeight(7),
    width: responsiveWidth(80),
    backgroundColor: 'red',
    marginTop: 15,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default MyObjectPage;
