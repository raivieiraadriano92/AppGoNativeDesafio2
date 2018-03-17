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
    issues: [],
    loading: true,
    refreshing: false,
    page: 1,
  }

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = async (refresh = false, loadMore = false) => {
    try {
      if (refresh) {
        await this.setState({
          page: 1,
          refreshing: true,
        });
      }

      if (loadMore) {
        await this.setState({ loading: true });
      }

      const { data } = await api.get(`/repos/${this.props.navigation.state.params.repo}/issues?page=${this.state.page}`);

      this.setState({
        issues: this.state.page === 1 ? data : [...this.state.issues, ...data],
        page: this.state.page + 1,
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
    <ListItem
      title={item.title}
      subtitle={item.user.login}
      avatar={item.user.avatar_url}
    />
  )

  renderList = () => (
    <View>
      <FlatList
        data={this.state.issues}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={() => { this.loadIssues(true); }}
        refreshing={this.state.refreshing}
        ListFooterComponent={<View style={styles.listFooter}>{this.state.loading ? <ActivityIndicator style={styles.loading} /> : null}</View>}
        // onEndReached={() => this.loadIssues(false, true)}
      />
    </View>
  );

  render() {
    return (
      <View>
        {this.state.issues.length ? this.renderList() : null}
      </View>
    );
  }
}
