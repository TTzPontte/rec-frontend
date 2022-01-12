import styled from "styled-components";

export const Container = styled.div``;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5px;
  cursor: pointer;

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

export const AreaEditing = styled.div`
  width: 444px;
  height: 40px;
  display: flex;
`;

export const AreaDropDown = styled.div`
  width: 368px;
  height: 100%;
`;

export const Header = styled.div`
  width: 368px;
  height: 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0px 7px 64px #00000012;
  background: #ffffff;
  border: 1px solid #c3c3d5;

  h1 {
    font: normal normal normal 16px/20px "Lato", sans-serif;
    padding-left: 20px;
    user-select: none;
    color: #3b3349;
  }

  .btnArrowDown {
    width: 26px;
    height: 12px;
    padding-right: 10px;
    transform: ${(props) => (props.isOpen ? "scaleY(-1)" : "scaleY(1)")};
    cursor: pointer;
  }
`;

export const List = styled.ul`
  width: 368px;
  height: 125px;
  position: absolute;
  overflow: auto;

  margin: 0;
  padding: 0;
  margin-top: 5px;

  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  background-color: white;
  border: 1px solid #c3c3d5;
  border-radius: 6px;
  box-shadow: 0px 7px 64px #00000012;

  ::-webkit-scrollbar {
    border-radius: 6px;
    width: 13px;
    background-color: #fff;
  }

  ::-webkit-scrollbar-track {
    border-radius: 6px;
    box-shadow: inset 0 0 10px 10px #e8e8ef;
    border: solid 3px transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    box-shadow: inset 0 0 10px 10px #c3c3d5;
    border: solid 3px transparent;
  }
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  font: normal normal normal 16px/20px;
  font-family: "Lato", sans-serif;
  font-weight: 300;

  &:hover {
    background-color: #f0f0f7;
  }

  span {
    padding: 10px;
    padding-left: 20px;
    cursor: pointer;
    color: #3b3349;
  }
`;

export const SubAreaAddItem = styled.div``;

export const BtnAddItem = styled.div`
  width: 100%;
  display: flex;

  font: normal normal normal 16px/20px;
  font-family: "Lato", sans-serif;
  font-weight: 300;
  color: #2c3faa;
  border: 0;

  img {
    padding-left: 20px;
    cursor: pointer;
  }

  span {
    padding: 10px;
    cursor: pointer;
  }
`;

export const InputAddItem = styled.div`
  margin: 10px;

  input {
    padding: 10px;
    padding-left: 20px;
    width: 100%;
    border: 1px solid #c3c3d5;
    border-radius: 6px;
    box-sizing: border-box;
    font-family: "Lato", sans-serif;
    font-size: 15px;
    font-weight: 300;
  }

  input::placeholder {
    font-family: "Lato", sans-serif;
    font-size: 14px;
    font-weight: 300;
  }

  .checkConfirm-addItem {
    cursor: pointer;
    height: 23px;
    visibility: ${(props) => (props.hasText ? "visible" : "hidden")};
    margin-left: -35px;
    margin-bottom: -7px;
  }
`;

export const AreaSaveChanged = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  > * {
    cursor: pointer;
    height: 24px;
    width: 24px;
  }
`;
