import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from 'services/api';

import {
  Alert,
  View,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import ListItem from 'components/ListItem';

import styles from './styles';

export default class Issues extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state: { params }, goBack } = navigation || {};

    return {
      header: (
        <View style={styles.containerHeader}>
          <TouchableOpacity style={styles.buttonHeader} onPress={() => { goBack(); }}>
            <Icon style={styles.iconHeader} name="angle-left" size={20} />
          </TouchableOpacity>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>{params.repo}</Text>
          </View>
        </View>
      ),
    };
  };

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          repo: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    page: 1,
    statesIssue: [
      {
        key: 'all',
        label: 'Todas',
      },
      {
        key: 'open',
        label: 'Abertas',
      },
      {
        key: 'close',
        label: 'Fechadas',
      },
    ],
    stateIssueSelected: 'all',
    issues: [],
    loading: true,
    refreshing: false,
  }

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = async (reloadList = false) => {
    try {
      const stateIssueSelected = await AsyncStorage.getItem('@Githuber:stateIssueSelected');

      if (stateIssueSelected) {
        await this.setState({ stateIssueSelected });
      }

      this.setState({ refreshing: true });

      const { data } = await api.get(`/repos/${this.props.navigation.state.params.repo}/issues?page=${this.state.page}&state=${this.state.stateIssueSelected}`);

      await this.setState({
        page: reloadList ? 1 : this.state.page + 1,
        issues: reloadList ? data : [...this.state.issues, ...data],
      });
    } catch (err) {
      Alert.alert('Ops.', 'Não foi possível carregar as Issues deste repositório!');
    } finally {
      this.setState({
        loading: false,
        refreshing: false,
      });
    }
  };

  changeStateFilterIssue = async ({ key }) => {
    await AsyncStorage.setItem('@Githuber:stateIssueSelected', key);

    await this.setState({ stateIssueSelected: key });

    await this.loadIssues(true);
  }

  renderListItem = ({ item }) => (
    <TouchableOpacity onPress={() => { Linking.openURL(item.url); }}>
      <ListItem
        title={`${item.title.substr(0, 20)}...`}
        subtitle={item.user.login}
        avatar={item.user.avatar_url}
      />
    </TouchableOpacity>
  )

  renderList = () => (
    <FlatList
      data={this.state.issues}
      keyExtractor={item => String(item.id)}
      renderItem={this.renderListItem}
      onRefresh={() => { this.loadIssues(true); }}
      refreshing={this.state.refreshing}
      ListHeaderComponent={(
        <View style={styles.filters}>
          {this.state.statesIssue.map(state => (
            <TouchableOpacity style={styles.filter} onPress={() => { this.changeStateFilterIssue(state); }} key={state.key}>
              <Text style={[styles.textFilter, (state.key === this.state.stateIssueSelected ? styles.textFilterSelected : {})]}>{state.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      ListFooterComponent={<View style={styles.listFooter} />}
    />
  );

  render() {
    return (
      <View>

        {this.state.loading
          ? <ActivityIndicator style={styles.loading} />
          : this.renderList()}
      </View>
    );
  }
}
