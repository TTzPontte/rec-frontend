import styled from 'styled-components';
import { palette } from 'styled-theme';
import {
  transition,
  borderRadius,
  boxShadow,
} from '@iso/lib/helpers/style_utils';
import WithDirection from '@iso/lib/helpers/rtl';



export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 86px 1fr;

  width: 100%;
  height: 105px;
`;

export const Header = styled.header`
  grid-column: 1/2;
  grid-row: 1/2;
  background-color: white;
  position: relative;
  box-shadow: 0px 3px 6px #0000000d;
`;



export const Logo = styled.div`
  top: 25%;
  left: 60px;
  position: absolute;
`;

export const Message = styled.p`
  text-align: center;
  font: medium 16px/20px Lato;
  letter-spacing: 0.1px;
  color: #3b3349;

  &.errorLogin {
    margin-bottom: 16px;
    letter-spacing: 0.1px;
    color: red;
    animation: 1s ease-out 0s 1 showError;
  }

  span {
    font-size: 20px;
  }
`;

export const Input = styled.input`
  width: 248px;
  height: 49px;
  margin: 12px;
  border: 0px;
`;

export const Button = styled.button`
  width: 150px;
  height: 49px;
  margin: 12px;
  background-color: #5c3b6b;
  color: #ffffff;
  border: 0px;
  border-radius: 5px;
`;

export const IconBuscaDiv = styled.div`
  float: left;
  margin: 27px;
`;

export const InputDiv = styled.div`
  float: left;
`;

export const ButtonDiv = styled.div`
  float: right;
`;

export const UserDiv = styled.div`
  float: right;
  width: 185px;
  margin-top: 22px;
  margin-right: 60px;
`;

export const UserImage = styled.img`
  width: 40px;
  border-radius: 20px;
`;

export const UserInfoDiv = styled.div`
  float: left;
  text-align: right;
`;

export const UserImageDiv = styled.div`
  float: right;
`;

export const TextoUserName = styled.section`
  color: var(--unnamed-color-3b3349);
  text-align: right;
  font: normal normal medium 16px/19px Lato;
  letter-spacing: 0px;
  color: #3b3349;
  opacity: 1;
  font-weight: bold;
`;

export const TextoUserEmail = styled.section`
  text-align: right;
  font-size: 12px;
  letter-spacing: 0px;
  color: #979797;
  opacity: 1;
`;


export const SairStyle = styled.a`
  color: var(--unnamed-color-3b3349);
  text-align: left;
  letter-spacing: 0.1px;
  color: #3B3349;
  opacity: 1;    
`;

