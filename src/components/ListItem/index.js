import React from 'react';
import PropTypes from 'prop-types';

import { Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const ListItem = ({
  title,
  subtitle,
  avatar,
}) => (
  <View style={styles.container}>
    <Image style={styles.avatar} source={{ uri: avatar }} />
    <View style={styles.containerDescription}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
    <Icon style={styles.iconAngleRight} name="angle-right" size={20} />
  </View>
);

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default ListItem;
