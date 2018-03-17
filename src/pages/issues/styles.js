import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
  },

  buttonHeader: {
    height: 70,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconHeader: {
    color: colors.darker,
  },

  containerTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: metrics.baseMargin * 2,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.darker,
  },

  loading: {
    marginVertical: metrics.basePadding,
  },

  listFooter: {
    height: 10,
  },
});

export default styles;
