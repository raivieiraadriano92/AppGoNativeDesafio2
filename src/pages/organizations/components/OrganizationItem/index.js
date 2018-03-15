import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, Image } from 'react-native';

import styles from './styles';

const OrganizationItem = ({ organization }) => (
  <View style={styles.container}>
    <Image style={styles.avatar} source={{ uri: organization.avatar_url }} />
    <Text style={styles.title}>{organization.login}</Text>
  </View>
);

OrganizationItem.propTypes = {
  organization: PropTypes.shape({
    login: PropTypes.string,
    avatar_url: PropTypes.string,
  }).isRequired,
};

export default OrganizationItem;
