import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  containerSearch: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: metrics.basePadding,
  },

  inputSearch: {
    backgroundColor: colors.lighter,
    borderRadius: metrics.baseRadius,
    height: 40,
    paddingHorizontal: metrics.basePadding,
    flex: 1,
    marginRight: metrics.baseMargin * 2,
  },

  loading: {
    marginTop: metrics.basePadding,
  },

  listFooter: {
    height: 10,
  },
});

export default styles;
