import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 86px 1fr;

  width: 100%;
  height: 100%;
`;

export const Header = styled.header`
  grid-column: 1/2;
  grid-row: 1/2;

  position: relative;
  box-shadow: 0px 3px 6px #0000000d;
`;

export const Main = styled.main`
  grid-column: 1/2;
  grid-row: 2/2;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background-color: #f0f0f7;
  margin-top: 50px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 1000px;

  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 3px 6px #00000029;

  header {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 60px;
    width: 100%;

    border-radius: 8px 8px 0px 0px;
    background-color: #9d89a6;
    color: #ffffff;
    font: normal normal bold 16px/19px Lato;
  }
`;

export const BtnGoogle = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  padding: 20px;
  width: 248px;
  height: 49px;

  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #f0f0f7;
  cursor: pointer;
  font-weight: bold;
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
  margin: 20px;
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
  margin-top: 3px;
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
  font: normal normal normal 12px/17px Lato;
  letter-spacing: 0px;
  color: #979797;
  opacity: 1;
`;

