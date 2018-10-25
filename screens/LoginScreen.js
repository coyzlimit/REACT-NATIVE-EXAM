import React from 'react';
import { Image, Platform, StyleSheet, View} from 'react-native';

import {LoginForm} from '../components/LoginForm';

export default class LoginScreen extends React.Component{


  render() {
    return (
      <View style={styles.container}>
         <View style={styles.logoView}>
            <Image source={require('../assets/splash.png')} style={styles.logo} />
         </View>
         <View style={styles.formView}>
            <LoginForm/>
         </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoView: {
    flex:1.3,
    overflow: 'hidden'
  },
  logo: {
    flex:1,
    resizeMode: 'contain'
  },
  formView: {
    flex:3,
    marginTop: 20,
    alignItems: 'center'
  }
});
