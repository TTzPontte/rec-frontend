import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import appActions from '@iso/redux/app/actions';
import TopbarNotification from './TopbarNotification';
import TopbarMessage from './TopbarMessage';
import TopbarSearch from './TopbarSearch';
import TopbarUser from './TopbarUser';
import TopbarAddtoCart from './TopbarAddToCart';
import { Modal, Button } from 'antd';
import { logOutAct } from "@iso/redux/auth/actions";



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
  SairStyle,
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

  const Auth = useSelector((state) => state.Auth)

  const [user, setUser] = useState(Auth.profile);

  const [selectedItem, setSelectedItem] = React.useState('');
  const customizedTheme = useSelector(state => state.ThemeSwitcher.topbarTheme);
  const { collapsed, openDrawer } = useSelector(state => state.App);
  const dispatch = useDispatch();
  const handleToggle = React.useCallback(() => dispatch(toggleCollapsed()), [
    dispatch,
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  }; 

  function logout() {
    dispatch(logOutAct());
  }

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
              <a onClick={showModal}>
                <UserImage src={user.picture} alt={user.name} />
              </a> 
              <Modal 
                style={{ top: 90, left: '35%', borderRadius: 5 }}  
                width={224}
                height={80}
                visible={isModalVisible}
                closable 
                onOk={handleOk} 
                onCancel={handleCancel}
                footer={null}
                closable={false}
              >
                <div>
                  <SairStyle onClick={logout} >Sair</SairStyle>
                </div>  
              </Modal>               
            </section>
          </UserImageDiv>
        </UserDiv>
      </Header> 
      </Container>     
  );
}
