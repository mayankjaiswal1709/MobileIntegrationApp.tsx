import React, { Component } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import _ from 'lodash';

class UsersScreen extends Component {
  state = {
    users: [],
    page: 1,
    isLoading: false,
  };

  componentDidMount() {
    this.loadUsers();
  }

  // Debounce the loadUsers function to limit its invocation
  loadUsers = _.debounce(async () => {
    const { page } = this.state;
    this.setState({ isLoading: true });
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      this.setState((prevState) => ({
        users: [...prevState.users, ...response.data.data],
        isLoading: false,
        page: prevState.page + 1,
      }));
    } catch (error) {
      console.log('Error fetching users:', error);
      this.setState({ isLoading: false });
    }
  }, 300); // 300ms debounce time

  navigateToUserProfile = (user) => {
    this.props.navigation.navigate('UserProfile', { userId: user.id });
  };

  renderUserItem = ({ item }) => {
    return (
      <TouchableOpacity key={item.id} onPress={() => this.navigateToUserProfile(item)}>
        <View style={styles.userItem}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.NameText}>Name: {item.first_name} {item.last_name}</Text>
            <Text style={styles.EmailText}>Email: {item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    if (!this.state.isLoading) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="#0000ff" />;
  };

  render() {
    const { users } = this.state;
    return (
      <FlatList
        data={users}
        renderItem={this.renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={this.loadUsers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No users found.</Text>}
      />
    );
  }
}
const styles = StyleSheet.create({
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    height: 150,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  NameText:{
    fontSize: 20,
  },
  EmailText:{
    fontSize: 15,
    marginTop:5,
  }
});

export default UsersScreen;
