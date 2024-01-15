import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity,Button, Alert,StyleSheet ,Image} from 'react-native';
import axios from 'axios';


class RegistrationScreen extends Component {
  state = {
    email: '',      
    password: '', 
    isEmailFocused: false,
    isPasswordFocused: false,  
  };

  handleEmailFocus = () => {
    this.setState({ isEmailFocused: true });
  };

  handleEmailBlur = () => {
    this.setState({ isEmailFocused: false });
  };

  handlePasswordFocus = () => {
    this.setState({ isPasswordFocused: true });
  };

  handlePasswordBlur = () => {
    this.setState({ isPasswordFocused: false });
  };
  handleNavigateLogin = () => {
    this.props.navigation.navigate('Login');
  };

  handleRegistration = async () => {
    const { email, password } = this.state;
    try {
      const response = await axios.post('https://reqres.in/api/register', {
        email: email,
        password: password,
      });
      // Log the response to see the registration details
      console.log('Registration Response:', response.data);
      Alert.alert('Success', 'Registered successfully');
      // Navigate to LoginScreen after successful registration
      this.props.navigation.navigate('Login');
    } catch (error) {
      // Log any errors for debugging purposes
      console.log('Registration Error:', error);
      Alert.alert('Error', 'Registration failed');
    }
  };
  
  render() {
    const { email, password, isEmailFocused, isPasswordFocused } = this.state;
    return (
        
      <View style={styles.container}>
        <Image 
         source={require('./public/assets/register.png')} 
        style={{ width: '100%', height: 200 }}  
        resizeMode="cover"
      />
        <Text style={styles.registerText}>Register</Text>
        <TextInput
          style={[styles.input, isEmailFocused && styles.focusedInput]}
          placeholder="Email"
          value={email}
          onFocus={this.handleEmailFocus}
          onBlur={this.handleEmailBlur}
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          style={[styles.input, isPasswordFocused && styles.focusedInput]}
          placeholder="Password"
          value={password}
          onFocus={this.handlePasswordFocus}
          onBlur={this.handlePasswordBlur}
          secureTextEntry
          onChangeText={(text) => this.setState({ password: text })}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleRegistration}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.AlreadyregisteredText}>Already Registered? </Text>
          <TouchableOpacity onPress={this.handleNavigateLogin}>
            <Text style={styles.loginText}>Login</Text>
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
    registerText: {
      fontSize: 30,
      color: '#000',
      marginBottom: 35,
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
    input: {
      width: '100%',
      marginBottom: 16,
      padding: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
    },
    focusedInput: {
      borderColor: 'purple',  // Change border color when focused
      transform: [{ scale: 1.05 }],  // Zoom effect when focused
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
  
  export default RegistrationScreen;