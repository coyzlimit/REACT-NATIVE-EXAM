import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';
import { KeyboardAvoidingView } from 'react-native';

import LoginScreen from './screens/LoginScreen';

export default class App extends React.Component {

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <LoginScreen/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight-10
  },
});
