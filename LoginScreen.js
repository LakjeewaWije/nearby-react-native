import React, { Component } from 'react';
import { Text, View, AsyncStorage, Alert, ImageBackground, StatusBar, TextInput, TouchableHighlight, Image, StyleSheet } from 'react-native';
// import console = require('console');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center',
  },
  imageContainer: {
    width: 300, height: 400, justifyContent: 'center', alignItems: 'center',
  },
  logo: {
    width: 300, height: 200,
  },
  boxViewContainer: {
    width: 300, height: 200,
  },
  userNameLabel: {
    color: 'white',
  },
  passswordLabel: {
    color: 'white', marginTop: 15
  },
  userNameInputBox: {
    height: 40, width: 300, borderColor: 'white', borderWidth: 1, color: 'white', borderRadius: 10, marginTop: 15,
  },
  passwordInputBox: {
    height: 40, width: 300, borderColor: 'white', borderWidth: 1, color: 'white', borderRadius: 10, marginTop: 15
  },
  touchableContainer: {
    height: 40, width: 300, backgroundColor: "#38BBC4", borderRadius: 10, alignItems: "center", justifyContent: "center", marginTop: 15
  },
  touchableContainerSignUp: {
    height: 25, width: 130, backgroundColor: "#ffffff", borderRadius: 6, alignItems: "center", justifyContent: "center", marginTop: 15
  },
  signInText: {
    color: 'white', fontWeight: 'bold', fontSize: 17,
  },
  signUpText: {
    color: '#ffffff', fontWeight: 'bold', fontSize: 14,
  },
  invalidDataEntry: {
    height: 40, width: 300, borderColor: '#DE5C83', borderWidth: 1, color: 'white', borderRadius: 10, marginTop: 15, backgroundColor: '#DE5C83'
  },
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      authToken:'',
      backgroundImage: 'https://i.pinimg.com/originals/00/ae/48/00ae4807a19a1819b986ad57aaef3aeb.jpg',
      logoPng: 'https://img.icons8.com/cotton/2x/twitter.png',
      isValidEntry: true,
    };
  }
  async getAuthToken(){
      try {
        const value = await AsyncStorage.getItem('authToken');
        if (value !== null) {
          // We have data!!
          // Alert.alert('Heres the auth Token', value);
          console.log(value);
         
          return value;
        }
      } catch (error) {
        Alert.alert('Error retrienving auth Token', error);
        return null;
        // Error retrieving data
      }
  };

  async setAuthToken(token){
    Alert.alert('setting auth Token',token);
   await AsyncStorage.setItem('authToken', token);
  }

  loginSuccessful() {
    let username = this.state.username.replace(/\s+/g, '');
    let password = this.state.password;
    if (username == '' || password == '') {
      console.log('All the fields are required!!!');
      this.setState({
        isValidEntry: false
      });
    } else {
      fetch('https://infinite-forest-62481.herokuapp.com/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then(async (responseJson) => {
          console.log(responseJson);
          // Alert.alert('Data Came', JSON.stringify(responseJson));
          if (responseJson['data'].status == '200') {
            // Alert.alert('Data Came',responseJson['data'].message);
            
            this.setAuthToken(responseJson['data'].authToken);
           const value = await this.getAuthToken();
            // Alert.alert('Heres the auth Token', value);
            this.setState({
              username: '',
              password: '',
              authToken: value
            });
            // const { navigate } = this.props.navigation;
            // navigate("Home", {});
            this.props.navigation.navigate('App');
          } else if (responseJson['data'].status == '400') {
            this.setState({
              isValidEntry: false
            });
            Alert.alert('Error', JSON.stringify(responseJson['data'].message));
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert('Data Error');
        });
    }

  };

  render() {

    return (

      <ImageBackground source={{ uri: this.state.backgroundImage }} style={{ width: '100%', height: '100%' }}>
        <StatusBar hidden />
        <View style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: this.state.logoPng }} style={styles.logo} />
          </View>

          <View style={styles.boxViewContainer} >
            <Text style={styles.userNameLabel}>Email/Username</Text>

            <TextInput style={this.state.isValidEntry ? styles.userNameInputBox : styles.invalidDataEntry} onChangeText={(username) => { this.setState({ username, isValidEntry: true }) }} value={this.state.username} autoCapitalize = 'none' />
            <Text style={styles.passswordLabel}>Password</Text>
            <TextInput secureTextEntry={true} style={this.state.isValidEntry ? styles.passwordInputBox : styles.invalidDataEntry} onChangeText={(password) => { this.setState({ password, isValidEntry: true }) }} value={this.state.password} autoCapitalize = 'none'/>
            <TouchableHighlight style={styles.touchableContainer} onPress={() => {
              this.loginSuccessful();
            }}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableHighlight>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch' }} >
              <View style={{ marginTop: 29, }} >
                <Text style={styles.signUpText} onPress={() => {
                  const { navigate } = this.props.navigation;
                  navigate("SingUp", {});
                }}>Create Account?</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
