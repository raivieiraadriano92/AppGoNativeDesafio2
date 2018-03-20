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

  filters: {
    borderRadius: metrics.baseRadius,
    backgroundColor: colors.light,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: metrics.baseMargin * 2,
    marginTop: metrics.baseMargin * 2,
  },

  filter: {
    flex: 1,
    alignItems: 'center',
    padding: metrics.basePadding / 2,
  },

  textFilter: {
    color: colors.regular,
    fontSize: 13,
    opacity: 0.5,
  },

  textFilterSelected: {
    fontWeight: 'bold',
    opacity: 1,
  },

  loading: {
    marginVertical: metrics.basePadding,
  },

  listFooter: {
    height: 10,
  },
});

export default styles;
