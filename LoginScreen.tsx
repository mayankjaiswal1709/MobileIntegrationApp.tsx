import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';

interface LoginScreenState {
  email: string;
  password: string;
}

class LoginScreen extends Component<any, LoginScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  handleNavigateregister = () => {
    this.props.navigation.navigate('Registration');
  };
  
  handleLogin = async () => {
    const { email, password } = this.state;
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email: email,
        password: password,
      });
      if (response.data.token) {
        Alert.alert('Success', 'Logged in successfully');
        this.props.navigation.navigate('Users');
      } else {
        Alert.alert('Error', 'Login failed');
      }
    } catch (error) {
      console.log('Login Error:', error);
      Alert.alert('Error', 'Login failed');
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <View style={styles.container}>
        <Image 
          source={require('./public/assets/login.png')} 
          style={{ width: '100%', height: 300 }}  
          resizeMode="cover"
        />
        <Text style={styles.registerText}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => this.setState({ password: text })}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

     
            <Text style={styles.loginText}>Forget Password ?</Text>
            <View style={styles.loginContainer}>
          <Text style={styles.AlreadyregisteredText}>New to the App </Text>
          <TouchableOpacity onPress={this.handleNavigateregister}>
            <Text style={styles.loginText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  AlreadyregisteredText:{
    fontSize: 15,
    color: '#000',
    marginTop: 15,
},
loginContainer: {
    flexDirection: 'row',  // Arrange children in a row
    marginTop: 15,  
    
  },
  
  loginText: {
    color: 'purple',       // Set text color to purple
    fontSize: 15,   
    marginTop: 15,  
},
  registerText: {
    fontSize: 30,
    color: '#000',
    marginBottom: 35,
  },
  input: {
    width: '100%',
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'purple',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;
