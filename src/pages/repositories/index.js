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
import ListItem from 'components/ListItem';

import styles from './styles';

export default class Repositories extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    repo: 'raivieiraadriano92/AppGoNativeDesafio1',
    searching: false,
    repos: [],
    loading: true,
    refreshing: false,
  }

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true });

    const repos = await AsyncStorage.getItem('@Githuber:repos');

    console.log(JSON.parse(repos));

    this.setState({
      repos: repos.length > 0 ? JSON.parse(repos) : [],
      loading: false,
      refreshing: false,
    });
  };

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

      this.setState({ searching: true });

      const { data } = await api.get(`/repos/${this.state.repo}`);

      this.setState({ repos: [data, ...this.state.repos] });

      await AsyncStorage.setItem('@Githuber:repos', JSON.stringify(this.state.repos));
    } catch (err) {
      Alert.alert('Ops.', 'Este repositório não existe!');
    } finally {
      this.setState({
        repo: '',
        searching: false,
      });
    }
  }

  renderListItem = ({ item }) => <ListItem title={item.name} subtitle={(item.organization ? item.organization : item.owner).login} avatar={(item.organization ? item.organization : item.owner).avatar_url} />

  renderList = () => (
    <FlatList
      data={this.state.repos}
      keyExtractor={item => String(item.id)}
      renderItem={this.renderListItem}
      onRefresh={this.loadRepositories}
      refreshing={this.state.refreshing}
      ListFooterComponent={<View style={styles.listFooter} />}
    />
  );

  render() {
    return (
      <View>
        <View style={styles.containerHeader}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={repo => this.setState({ repo })}
            onSubmitEditing={this.addRepo}
            placeholder="Adicionar repositório"
            style={styles.inputSearch}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={this.state.repo}
          />
          { this.state.searching
            ? <ActivityIndicator />
            : <Icon style={styles.iconHeader} name="plus" onPress={this.addRepo} size={16} />
          }
        </View>
        { this.state.loading
          ? <ActivityIndicator style={styles.loading} />
          : this.renderList() }
      </View>
    );
  }
}
