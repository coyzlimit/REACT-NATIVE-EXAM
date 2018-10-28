import React from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, CheckBox, Switch, Alert, AsyncStorage} from 'react-native';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

export class LoginForm extends React.Component{

  state = {
    email: '',
    password: '',
    remember: false,
    emailError: '',
    passwordError: ''
  };

  constructor(){
    super();
    this.getSavedUser();
  }

  render() {

    let checkError = false;
    if(this.state.emailError != '' || this.state.email == '' || this.state.passwordError != '' || this.state.password == ''){
       checkError = true
    }

    return (
      <View style={styles.formView}>

        <Text style={styles.label}>Email</Text>
        <TextInput onChangeText={ (email) => this.handleEmail(email) } style={styles.textInput}
        textContentType="username" keyboardType="email-address" value={ this.state.email } placeholder="Input email address"/>
        <Text style={styles.errorMessage}>{ this.state.emailError }</Text>

        <Text style={styles.label}>Password</Text>
        <TextInput onChangeText={ (password) => this.handlePassword(password) } style={styles.textInput}
        maxLength={12} secureTextEntry={true} textContentType="password" value={ this.state.password } placeholder="Input password"/>
        <Text style={styles.errorMessage} >{ this.state.passwordError }</Text>

        { Platform.OS === 'ios'
            ? <View style={styles.switchView}><Switch value={this.state.remember} onValueChange={this.handleRemember} />
              <Text style={styles.switchViewLabel}>Remember me.</Text></View>
            : <View style={styles.switchView}><CheckBox value={this.state.remember} onValueChange={this.handleRemember} />
              <TouchableOpacity onPress={this.handleRemember}><Text style={styles.switchViewLabel}>Remember me</Text></TouchableOpacity></View>
        }

        <TouchableOpacity style={ checkError ? styles.buttonDisabled : styles.button } onPress={this.handleSignIn}
        disabled = { checkError ? true : false }>
            <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }



  handleEmail = (email: String) => {
    const state = {...this.state};
    let ve = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // if(email.indexOf('@') > -1 && email.indexOf('.') > -1){
    if(ve.test(String(email).toLowerCase())){
      state.emailError = '';
    }else{
      state.emailError = "not correct format for email address";
    }
    state.email = email;
    this.setState(state);
  }

  handlePassword = (password: String) => {
    const state = {...this.state};

    if(password.length > 5 && password.length < 13){
      state.passwordError = '';
    }else{
      state.passwordError = "please use at least 6 - 12 characters";
    }
    state.password = password;
    this.setState(state);
  }

  handleRemember = () => {
    const state = {...this.state};
    state.remember = !this.state.remember;
    this.setState(state);
  }

  handleSignIn = () => {
    if(this.state.remember){
      AsyncStorage.setItem("user", JSON.stringify( this.state ))
    }else{
      AsyncStorage.removeItem("user")
    }

    Alert.alert(
      'Alert',
      'Successfully Login!',
      [
        {text: 'Okay', onPress: () => this.clearFields() }
      ],
      { cancelable: false }
    )
    console.log(this.state);
  }

  getSavedUser = async () => {
    try{
      let user = await AsyncStorage.getItem("user");
       if (user !== null) {
         this.setState( JSON.parse(user) );
       }
    }catch(error){
      console.log(error);
    }
  }

  clearFields = () => {
    if(!this.state.remember){
      const state = {...this.state};
      state.emailError = '';
      state.email = '';
      state.passwordError = '';
      state.password = '';
      state.remember = false;
      this.setState(state)
    }
  }

};

const styles = StyleSheet.create({
  formView: {
    width: Layout.window.width,
    padding: 10
  },
  label:{
    fontSize: 24,
    fontWeight: '400'
  },
  errorMessage:{
    fontSize: 18,
    minHeight: 20,
    maxHeight: 20,
    fontWeight: '200',
    color: Colors.errorText,
    marginBottom: 3,
    fontStyle: 'italic'
  },
  textInput:{
    borderWidth: 1,
    fontSize: 22,
    borderRadius: 4,
    padding: 8,
    borderColor: Colors.borderDefault
  },
  button: {
    alignItems: 'center',
    borderRadius: 4,
    padding: 8,
    marginTop: 20,
    backgroundColor: Colors.buttonDefault
  },
  buttonDisabled: {
    alignItems: 'center',
    borderRadius: 4,
    padding: 8,
    marginTop: 20,
    backgroundColor: Colors.buttonDisabled
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600'
  },
  switchView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  switchViewLabel: {
    fontSize: 18,
    marginLeft: 4,
    color: Colors.noticeText
  }
});
