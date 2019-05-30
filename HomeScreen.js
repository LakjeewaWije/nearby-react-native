import React, { Component } from 'react';
import { Text, View , Button, Alert, AsyncStorage} from 'react-native';
export default class Home extends Component {

  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.state = {
      authToken: 'k'
    };
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('authToken');
      this.setState({
        authToken: userToken
      });
  };

  Logout() {
    // const value =  this.getAuthToken();
  //  Alert.alert('Heres the auth Token', this.state.authToken);

        fetch('https://infinite-forest-62481.herokuapp.com/api/logout', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-AuthToken': this.state.authToken
            }
        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson);
                // Alert.alert('Data Came', JSON.stringify(responseJson));
                if (responseJson['data'].status == '200') {
                    Alert.alert('Data Came', JSON.stringify(responseJson['data'].message));
                    await AsyncStorage.clear();
                    this.props.navigation.navigate('Auth');
                } else if (responseJson['data'].status == '400') {
                    Alert.alert('Error', JSON.stringify(responseJson['data'].message));
                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Data Error');
            });

};
  render() {
    return (
        <View style={{flex: 1,backgroundColor: '#6ED4C8'}}>
        <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 14, marginLeft:20, marginTop:20}} onPress={() => {
                  this.Logout();
                }}>Logout</Text>
      </View>
   
    );
  }
}