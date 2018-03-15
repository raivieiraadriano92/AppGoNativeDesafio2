import React from 'react';
import { StackNavigator } from 'react-navigation';

import Repositories from 'pages/repositories';

const createNavigator = () => StackNavigator({
  Repositories: { screen: Repositories },
}, {
  initialRouteName: 'Repositories',
});

export default createNavigator;
