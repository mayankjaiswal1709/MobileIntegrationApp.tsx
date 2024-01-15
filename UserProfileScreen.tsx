import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

class UserProfileScreen extends Component {
  state = {
    user: {},
    firstName: '',
    lastName: '',
  };

  componentDidMount() {
    const userId = this.props.route.params.userId;
    this.loadUserProfile(userId);
  }

  loadUserProfile = async (userId) => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${userId}`);
      const user = response.data.data;
      this.setState({ user, firstName: user.first_name, lastName: user.last_name });
    } catch (error) {
      console.log('Error fetching user profile:', error);
    }
  };

  updateUserProfile = async () => {
    const { user, firstName, lastName } = this.state;
    try {
      await axios.put(`https://reqres.in/api/users/${user.id}`, {
        first_name: firstName,
        last_name: lastName,
      });
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.log('Error updating user profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  render() {
    const { user, firstName, lastName } = this.state;
    const avatarSource = user.avatar ? { uri: user.avatar } : require('./public/assets/person.jpg');
    return (
      <View style={styles.container}>
        {/* Background color similar to RegistrationScreen */}
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <Image source={avatarSource} style={styles.avatar} />
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => this.setState({ firstName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => this.setState({ lastName: text })}
          />
          <TouchableOpacity style={styles.button} onPress={this.updateUserProfile}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Similar to RegistrationScreen background
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
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

export default UserProfileScreen;
