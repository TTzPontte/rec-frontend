import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import appActions from '@iso/redux/app/actions';
import TopbarNotification from './TopbarNotification';
import TopbarMessage from './TopbarMessage';
import TopbarSearch from './TopbarSearch';
import TopbarUser from './TopbarUser';
import TopbarAddtoCart from './TopbarAddToCart';


import {
  Container,
  Header,
  Logo,
  UserDiv,
  UserImage,
  UserInfoDiv,
  UserImageDiv,
  TextoUserName,
  TextoUserEmail,
} from './Topbar.styles';

import { ReactComponent as SvgLogoPontte } from '../../assets/logo-pontte.svg';

const styleLogoPontte = {
  width: '160px',
  height: '36px',
  color: '#5C3B6B',
};

// const { Header } = Layout;
const { toggleCollapsed } = appActions;

export default function Topbar() {
  const [user, setUser] = useState({name: "Fulano", email:"fulano@mail.com", picture:"ble"});

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
        <Logo>
          <SvgLogoPontte style={styleLogoPontte} />
        </Logo>
        <UserDiv>
          <UserInfoDiv>
            <TextoUserName>{user.name}</TextoUserName>
            <TextoUserEmail>{user.email}</TextoUserEmail>
          </UserInfoDiv>
          <UserImageDiv>
            <section>
              <UserImage src={user.picture} alt={user.name} />
            </section>
          </UserImageDiv>
        </UserDiv>
      </Header> 
      </Container>     
  );
}
