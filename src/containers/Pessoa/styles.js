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

  h2 {
    margin-top: 5px;
    grid-column: 1/3;
    font: normal normal bold 16px "Lato", sans-serif;
    letter-spacing: 0px;
    color: #5c3b6b;
  }

  padding: 20px;
  border: solid 1px #e1dfdf;
  border-left: solid 4px #5c3b6b;
  border-radius: 5px;
`;
