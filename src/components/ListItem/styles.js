import { StyleSheet } from 'react-native';
import { general, metrics, colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    ...general.box,
    marginHorizontal: metrics.basePadding,
    marginTop: metrics.baseMargin,
    flexDirection: 'row',
    alignItems: 'center',
  },

  containerDescription: {
    flex: 1,
    marginHorizontal: metrics.basePadding,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.darker,
  },

  subtitle: {
    fontSize: 12,
    color: colors.regular,
  },

  avatar: {
    width: 45,
    height: 45,
  },

  iconAngleRight: {
    color: colors.regular,
  },
});

export default styles;
