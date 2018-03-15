import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from 'services/api';
import { NavigationActions } from 'react-navigation';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import styles from './styles';

export default class Welcome extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    username: '',
    loading: false,
    errorMessage: null,
  };

  checkUserExists = async (username) => {
    await api.get(`/users/${username}`);
  };

  saveUser = async (username) => {
    await AsyncStorage.setItem('@Githuber:username', username);
  };

  signIn = async () => {
    const { username } = this.state;

    if (username.length === 0) return;

    this.setState({ loading: true });

    try {
      // Checa se usuário existe
      await this.checkUserExists(username);

      // Salva usuário no storage
      await this.saveUser(username);

      // Redireciona o usuário
      const { dispatch } = this.props.navigation;

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'User' }),
        ],
      });

      dispatch(resetAction);
    } catch (err) {
      this.setState({ loading: false, errorMessage: 'Usuário não encontrado' });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.text}>
          Para continuar, precisamos que você informe seu usuário no Github
        </Text>

        { !!this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text> }

        <View style={styles.form}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            placeholder="Digite seu usuário"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
          />

          <TouchableOpacity onPress={this.signIn} style={styles.button}>
            { this.state.loading
              ? <ActivityIndicator size="small" color="#FFF" />
              : <Text style={styles.buttonText}>Prosseguir</Text> }
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
