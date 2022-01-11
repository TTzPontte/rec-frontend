import styled from "styled-components";

export const Container = styled.div`
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
    font: normal normal bold 16px/19px "Lato", sans-serif !important;
  }

  .ant-collapse-icon-position-right
    > .ant-collapse-item
    > .ant-collapse-header {
    padding-left: 30px;
    padding-right: 40px;
  }
`;
