import styled from "styled-components";

export const Container = styled.div`
  padding: 10px 10px;
  margin: 10px;
  margin-top: 70px;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  margin-bottom: 20px;

  header {
    margin-top: 5px;
    grid-column: 1/3;
    letter-spacing: 0px;
    color: #5c3b6b;
    font: normal normal 500 1.1em system-ui !important;
    letter-spacing: 0.2px !important;
  }

  padding: 20px;
  border: 1px solid #e8e8ef;
  border-left: solid 4px #5c3b6b;
  border-radius: 5px;
`;
