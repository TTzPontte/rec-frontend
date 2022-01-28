import { combineReducers } from 'redux';
import App from '@iso/redux/shared/template/app/reducer';
import Auth from '@iso/redux/auth/reducer';
import ThemeSwitcher from '@iso/redux/shared/template/themeSwitcher/reducer';
import LanguageSwitcher from '@iso/redux/shared/template/languageSwitcher/reducer';

export default combineReducers({
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
});
