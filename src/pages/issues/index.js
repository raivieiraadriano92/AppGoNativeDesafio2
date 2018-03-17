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
  Text,
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

  state = {
    page: 1,
    issues: [],
    loading: true,
    refreshing: false,
  }

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    try {
      this.setState({ refreshing: true });

      const { data } = await api.get(`/repos/${this.state.repo}/issues?page=${this.state.page}`);

      console.log(data);

      const issues = await AsyncStorage.getItem('@Githuber:repos');

      this.setState({
        page: this.state.page + 1,
        issues: issues ? JSON.parse(issues) : [],
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
      data={this.state.issues}
      keyExtractor={item => String(item.id)}
      renderItem={this.renderListItem}
      onRefresh={this.loadIssues}
      refreshing={this.state.refreshing}
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
