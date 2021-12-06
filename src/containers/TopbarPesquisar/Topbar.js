import appActions from '@iso/redux/app/actions';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as SvgLogoPontte } from '../../assets/logo-pontte.svg';
import {
  Container,
  Header,
  Logo, TextoUserEmail, TextoUserName, UserDiv,
  UserImage, UserImageDiv, UserInfoDiv
} from './Topbar.styles';




const styleLogoPontte = {
  width: '160px',
  height: '36px',
  color: '#5C3B6B',
};

// const { Header } = Layout;
const { toggleCollapsed } = appActions;

export default function TopbarPesquisar({uiid}) {

  const Auth = useSelector((state) => state.Auth)

  const [user, setUser] = useState(Auth.profile);

  const [selectedItem, setSelectedItem] = React.useState('');
  const customizedTheme = useSelector(state => state.ThemeSwitcher.topbarTheme);
  const { collapsed, openDrawer } = useSelector(state => state.App);
  const dispatch = useDispatch();
  const handleToggle = React.useCallback(() => dispatch(toggleCollapsed()), [
    dispatch,
  ]);
  const isCollapsed = collapsed && !openDrawer;
  const styling = {
    background: customizedTheme.backgroundColor,
    position: 'fixed',
    width: '100%',
    height: 70,
  };
  return (
      <Container>
      <Header>
      <h2>#{uiid}</h2>
      </Header> 
      </Container>     
  );
}
