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
  padding: 32px 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
  }

  div {
    padding-left: 10px;
    display: flex;
    flex-direction: column;

    strong {
      font-weight: 700;
      color: ${colors.textSecondary};
    }

    span {
      color: ${colors.textTertiary};
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

      cursor: pointer;

      img {
        margin: 0px 16px;
        width: 20px;
        height: 20px;
      }

      a {
        color: ${colors.textSecondary};
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

  cursor: pointer;

  div {
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
