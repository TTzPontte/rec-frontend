import styled from "styled-components";

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  //grid-template-rows: 65px 1fr 80px;
  margin-bottom: 20px;

  > * {
    padding: 10px 10px 35px;
  }

  header {
    height: 50px;
    padding: 10px;
    padding-bottom: 0;
    margin-top: 5px;
    grid-column: 1/3;
    letter-spacing: 0px;
    color: #5c3b6b;
    font: normal normal 500 1.2em system-ui !important;
    letter-spacing: 0.2px !important;
  }

  .addFilePessoa {
    grid-column: 1/3;
    grid-row: 5/5;
    position: relative;

    button {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }

  .documentoPessoa {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  padding: 20px;
  border: 1px solid #e8e8ef;
  border-left: solid 4px #5c3b6b;
  border-radius: 5px;
`;

export const BtnAdd = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  font: normal normal normal 16px/20px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  border: 0;

  span {
    padding: 10px;
    letter-spacing: 0.1px;
    cursor: pointer;
    color: #2c3faa;
  }

  .buttonAddDocument {
    width: 131px;
    height: 36px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #c3c3d5;
    border-radius: 4px;
  }
`;
