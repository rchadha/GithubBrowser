/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} from 'react-native';

var Login = require('./Login');
var AuthService = require('./AuthService');

class GithubBrowser extends Component {
  constructor(props) {
    console.log("I am in constructor")
    super(props);
    this.onLogin = this.onLogin.bind(this);

    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    };
  }

  componentDidMount() {
    console.log("I am in componentDidMount function")
    AuthService.getAuthInfo((err, authInfo)=> {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    });
  }

  render() {
    console.log("I am in render function")
    if (this.state.checkingAuth){
      return (
          <View style={styles.container}>
            <ActivityIndicatorIOS animating={true} size="large" style={styles.loader} />

          </View>
        )
      }

    if(this.state.isLoggedIn){
      return (
          <View style={styles.container}>
            <Text style={styles.welcome}> Login success </Text>
          </View>
        )

    }else{
      return (
        <Login onLogin={this.onLogin} />
        )
    }

  }

  onLogin() {
    console.log("I am in login function");
    this.setState({isLoggedIn: true});

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
