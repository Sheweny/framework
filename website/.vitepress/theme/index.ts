import DefaultTheme from 'vitepress/theme';
import '../style/vars.css';

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
  },
};
