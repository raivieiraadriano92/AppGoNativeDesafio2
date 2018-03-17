import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from 'services/api';

import {
  Alert,
  View,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ListItem from 'components/ListItem';

import styles from './styles';

export default class Repositories extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      header: (
        <View style={styles.containerHeader}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={params.setRepo}
            onSubmitEditing={params.addRepo}
            placeholder="Adicionar repositório"
            style={styles.inputSearch}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={params.repo}
          />
          <TouchableOpacity style={styles.buttonHeader} onPress={params.addRepo}>
            {params.searching
              ? <ActivityIndicator />
              : <Icon style={styles.iconHeader} name="plus" size={16} />}
          </TouchableOpacity>
        </View>
      ),
    };
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      setParams: PropTypes.func,
    }).isRequired,
  };

  state = {
    repo: '',
    searching: false,
    repos: [],
    loading: true,
    refreshing: false,
  }

  componentWillMount() {
    this.props.navigation.setParams({ addRepo: this.addRepo });
    this.props.navigation.setParams({ setRepo: repo => this.setState({ repo }) });
  }

  componentDidMount() {
    this.loadRepositories();
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState.searching !== this.state.searching) {
      newProps.navigation.setParams({ searching: newState.searching });
    }

    if (newState.repo !== this.state.repo) {
      newProps.navigation.setParams({ repo: newState.repo });
    }

    return true;
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true });

    const repos = await AsyncStorage.getItem('@Githuber:repos');

    this.setState({
      repos: repos ? JSON.parse(repos) : [],
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

  goIssues = ({ id, full_name }) => {
    const { navigate } = this.props.navigation;

    navigate('Issues', { repo: full_name });
  }

  renderListItem = ({ item }) => (
    <TouchableOpacity onPress={() => { this.goIssues(item); }}>
      <ListItem
        title={item.name}
        subtitle={(item.organization ? item.organization : item.owner).login}
        avatar={(item.organization ? item.organization : item.owner).avatar_url}
      />
    </TouchableOpacity>
  )

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
        { this.state.loading
          ? <ActivityIndicator style={styles.loading} />
          : this.renderList() }
      </View>
    );
  }
}
