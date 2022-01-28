import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  font: normal normal normal 15px "Lato", sans-serif;

  .iconPencilEdit {
    visibility: hidden;
  }

  :hover {
    color: #2c3faa;
    .iconPencilEdit {
      visibility: visible;
    }
  }

  > :first-child {
    margin-right: 10px;
  }

  > :nth-child(2) {
    margin-right: 5px;
  }
`;

export const Content = styled.div`
  display: flex;
`;

export const AreaInput = styled.div`
  width: 368px;
  height: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) =>
    props.isEditable &&
    `
    border-radius: 6px;
    box-shadow: 0px 7px 64px #00000012;
    background: #ffffff;
    border: 1px solid #c3c3d5;
    margin-left: 2px;
    margin-top: 10px;
    `}

  h1 {
    padding-left: 20px;
    user-select: none;
    color: #3b3349;
  }

  .ant-input-disabled {
    font: normal normal normal 14px "Lato", sans-serif !important;
    border: 0 !important;
    color: rgb(151, 151, 151) !important;
  }

  .jpdTQc.ant-input {
    font: normal normal normal 16px/20px "Lato", sans-serif !important;
    border: 0 !important;
    width: 368px !important;
  }

  .ant-input {
    font: normal normal normal 14px "Lato", sans-serif !important;
    border: 0 !important;
    width: 368px !important;
  }
`;

export const AreaSaveChanged = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  > * {
    cursor: pointer;
    height: 24px;
    width: 24px;
    margin-left: 10px;
  }
`;
