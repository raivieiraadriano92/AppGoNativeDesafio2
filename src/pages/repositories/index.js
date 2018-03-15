import React, { Component } from 'react';
import api from 'services/api';

import {
  Alert,
  View,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import RepositoryItem from './components/RepositoryItem';

import styles from './styles';

export default class Repositories extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    repo: 'FokaNaWeb/ReactNativeSeed',
    repos: [],
    loading: true,
    refreshing: false,
  }

  // componentDidMount() {
  //   this.loadRepositories();
  // }

  // loadRepositories = async () => {
  //   this.setState({ refreshing: true });

  //   const username = await AsyncStorage.getItem('@Githuber:username');

  //   const response = await api.get(`/users/${username}/repos`);

  //   this.setState({
  //     repos: response.repos,
  //     loading: false,
  //     refreshing: false,
  //   });
  // };

  // renderListItem = ({ item }) => <RepositoryItem repository={item} />

  // renderList = () => (
  //   <FlatList
  //     data={this.state.repos}
  //     keyExtractor={item => String(item.id)}
  //     renderItem={this.renderListItem}
  //     onRefresh={this.loadRepositories}
  //     refreshing={this.state.refreshing}
  //     ListFooterComponent={<View style={styles.listFooter} />}
  //   />
  // );

  addRepo = async () => {
    try {
      if (!this.state.repo.length) {
        return;
      }

      const exists = this.state.repos.find(repo => repo.full_name === this.state.repo);

      if (exists) {
        Alert.alert('Ops.', 'Este repositório já foi adicionado!');

        return;
      }

      const { data } = await api.get(`/repos/${this.state.repo}`);

      this.setState({ repos: [data, ...this.state.repos] });

      await AsyncStorage.setItem('@Githuber:repos', JSON.stringify(this.state.repos));
    } catch (err) {
      Alert.alert('Ops.', 'Este repositório não existe!');
    }
  }

  render() {
    return (
      <View>
        <View style={styles.containerSearch}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={repo => this.setState({ repo })}
            placeholder="Adicionar repositório"
            style={styles.inputSearch}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={this.state.repo}
          />
          <Icon
            name="plus"
            onPress={this.addRepo}
            size={20}
          />
        </View>
        {/* { this.state.loading
          ? <ActivityIndicator style={styles.loading} />
          : this.renderList() } */}
      </View>
    );
  }
}
