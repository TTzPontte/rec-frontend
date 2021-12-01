import styled from "styled-components";

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
  grid-row: 2/3;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  background-color: #f0f0f7;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 15vh;
  margin-bottom: 16px;
  width: 424px;
  height: 204px;

  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 3px 6px #00000029;

  header {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 61px;
    width: 100%;
    padding: 15px;

    border-radius: 8px 8px 0px 0px;
    background-color: #9d89a6;
    color: #ffffff;
    font: normal normal bold 16px/19px "Lato", sans-serif;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;

export const BtnGoogle = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 5px;

  padding: 20px;
  width: 248px;
  height: 49px;

  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #f0f0f7;
  letter-spacing: 0.1px;
  font-weight: 500;
  cursor: pointer;
  color: #3b3349;
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
    animation-name: appearText;
    animation-duration: 3s;
  }

  span {
    font-size: 20px;
  }

  @keyframes appearText {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes downMessage {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0%);
    }
  }
`;