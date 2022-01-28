import styled from "styled-components";

const colors = {
  backgroundPrimary: "#FFFFFF",

  textPrimary: "#5C3B6B",
  textSecondary: "#3B3349",
  textTertiary: "#979797",

  shadowPrimary: "#0000000f",
  sideNavBackground: "#FFFFFF",
};

export const Container = styled.div`
  width: 260px;
  height: 100%;
  background-color: ${colors.sideNavBackground};
  box-shadow: 6px 0px 18px ${colors.shadowPrimary};
  border-radius: 0px 4px 4px 0px;
`;

export const Header = styled.header`
  height: 62px;
  padding-left: 20px;
  border-bottom: 1px solid ${colors.shadowPrimary};
  display: flex;
  align-items: center;
  justify-content: start;

  img {
    width: 104px;
    height: 24px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;

  padding: 32px 0px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 10px;
  }

  div {
    padding-left: 10px;
    display: flex;
    flex-direction: column;

    strong {
      font-weight: 400;
      font: normal normal medium 16px/19px "Lato", sans-serif;
      color: ${colors.textSecondary};
    }

    span {
      font-size: 12px;
      overflow: auto;
      color: ${colors.textTertiary};
      min-height: 20px;
      max-height: 40px;
      width: 180px;
      word-wrap: break-word;
    }
  }
`;

export const Nav = styled.nav`
  width: 260px;
  border-bottom: 1px solid ${colors.shadowPrimary};

  ul {
    li {
      width: 100%;
      height: 40px;

      display: flex;
      align-items: center;
      justify-content: start;

      margin-bottom: 10px;

      letter-spacing: 0.1px;
      font: normal normal normal 16px/19px Lato;

      .navButton {
        width: 100%;
        margin-left: 10px;

        img {
          margin: 0px 16px;
          width: 20px;
          height: 20px;
        }

        a {
          margin-left: 10px;
          color: ${colors.textSecondary};
        }
      }
    }

    li:hover {
      background-color: #f0f0f7;
    }
  }
`;

export const Footer = styled.footer`
  width: 260px;
  height: 40px;

  display: flex;
  align-items: center;

  position: absolute;
  bottom: 0;
  margin: auto;
  margin-bottom: 20px;

  div {
    span {
      cursor: pointer;
    }
    img {
      width: 20px;
      height: 20px;
      margin: 0px 16px;
    }
  }

  &:hover {
    background-color: #f0f0f7;
  }
`;
