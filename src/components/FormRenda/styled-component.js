import styled from "styled-components";

export const Container = styled.div`
  width: 480px;
  height: 430px;
  border: 1px solid #e8e8ef;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      margin-right: 10px;
    }

    span {
      font: normal normal normal 16px "Lato", sans-serif;
      letter-spacing: 0.1px;
      color: #3b3349;
    }
  }
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const Field = styled.div`
  padding: 20px;
  height: 90px;

  .title {
    font: normal normal normal 15px "Lato", sans-serif;
    color: #3b3349;
    padding: 0 0 10px;

    img {
      margin-right: 10px;
    }
  }

  .value {
    letter-spacing: 0.2px;
    color: #979797;
    padding: 2px;
  }

  .textFileSelected {
    letter-spacing: 0.2px;
    color: #979797;
    padding: 2px;
    cursor: pointer;
    text-decoration: underline;
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