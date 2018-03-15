import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.basePadding * 2,
    backgroundColor: colors.secundary,
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  title: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },

  text: {
    textAlign: 'center',
    marginTop: metrics.baseMargin,
    fontSize: 14,
    color: colors.light,
    lineHeight: 21,
  },

  error: {
    color: colors.danger,
    textAlign: 'center',
    marginTop: metrics.baseMargin,
  },

  form: {
    marginTop: metrics.baseMargin * 2,
  },

  input: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    height: 44,
    paddingHorizontal: metrics.basePadding,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: metrics.baseRadius,
    alignSelf: 'stretch',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: metrics.baseMargin,
  },

  buttonText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 14,
  },
});

export default styles;
