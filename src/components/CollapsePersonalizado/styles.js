import styled from "styled-components";

export const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
  
  margin: 10px;
  .ant-collapse {
    border: 0;
  }
  .ant-collapse-header {
    display: flex;
    align-items: center;

    height: 51px !important;

    color: white !important;
    background: #9d89a6;
    border-radius: 4px 4px 0px 0px !important;

    text-transform: uppercase;
    font: normal normal 400 15px system-ui !important;
    letter-spacing: 0.2px !important;
  }

  .ant-collapse-icon-position-right
    > .ant-collapse-item
    > .ant-collapse-header {
    padding-left: 30px;
    padding-right: 40px;
  }

  min-width: 1000px !important;
`;
