import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'antd';
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

import { ReactComponent as IconLogOut } from '../../assets/Log_out.svg';  

const styleLogoPontte = {
  width: '160px',
  height: '36px',
  color: '#5C3B6B',
};

export default function Topbar() {

  const Auth = useSelector((state) => state.Auth)
  const [user, setUser] = useState(Auth.profile);
  const dispatch = useDispatch();
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
                onOk={handleOk} 
                onCancel={handleCancel}
                footer={null}
                closable={false}
              >
                <div>
                  <div style={ {float: 'left', marginRight: 7} }>
                    <IconLogOut/>
                  </div>
                  <div>  
                    <SairStyle onClick={logout} >Sair</SairStyle>
                  </div>  
                </div>  
              </Modal>               
            </section>
          </UserImageDiv>
        </UserDiv>
      </Header> 
      </Container>     
  );
}
