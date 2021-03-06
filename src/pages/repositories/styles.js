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

  inputSearch: {
    backgroundColor: colors.lighter,
    borderRadius: metrics.baseRadius,
    height: 40,
    paddingHorizontal: metrics.basePadding,
    flex: 1,
    marginLeft: metrics.baseMargin * 2,
    fontSize: 12,
  },

  loading: {
    marginTop: metrics.basePadding,
  },

  listFooter: {
    height: 10,
  },
});

export default styles;
