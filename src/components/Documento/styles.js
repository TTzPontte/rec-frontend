import styled from "styled-components";

export const Container = styled.div`
  width: 480px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;
  border: 1px red solid;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #e8e8ef;
`;

export const Header = styled.div`
  margin-bottom: 15px;
  color: red;
  font: normal normal normal 16px "Lato", sans-serif;
  letter-spacing: 0.1px;
  color: #3b3349;
`;

export const File = styled.div`
  height: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px;
  margin-bottom: 10px;

  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #e8e8ef;
  border-radius: 4px;

  .btnFile {
    width: 14px;
    height: 13px;
    margin-left: 10px;
    cursor: pointer;
  }

  span {
    text-decoration: underline;
    font: normal normal medium 16px/19px Lato;
    letter-spacing: 0.1px;
    color: #3b3349;
    margin-left: 13px;
    cursor: pointer;
  }
`;

export const BtnAddFile = styled.div`
  width: 100%;
  display: flex;

  font: normal normal normal 16px/20px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  color: #2c3faa;
  border: 0;

  img {
    cursor: pointer;
  }

  span {
    padding: 10px;
    letter-spacing: 0.1px;
    cursor: pointer;
  }
`;
