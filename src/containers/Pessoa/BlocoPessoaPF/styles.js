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
