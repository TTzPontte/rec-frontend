import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import iconOrigination from "../../assets/icon-originacao.svg";
import iconPeople from "../../assets/icon-pessoas.svg";
import iconProposal from "../../assets/icon-proposta.svg";
import iconImmobile from "../../assets/icon-imovel.svg";
import iconContract from "../../assets/icon-contrato.svg";
import iconHome from "../../assets/icon-home.svg";
import { ReactComponent as SvgLogoPontte } from "@iso/assets/logo-pontte.svg";

import { Container, Header, UserInfo, Nav, Footer } from "./styled-components";

const SideNavigation = ({ handleOperacao }) => {
  const { profile } = useSelector((state) => state.Auth);
  console.log(profile);
  return (
    <Container>
      <Header>
        <SvgLogoPontte
          style={{
            width: "120px",
            height: "120px",
            color: "#5C3B6B",
            marginLeft: "10px",
          }}
        />
      </Header>

      <UserInfo>
        <img src={profile.picture} alt="" />

        <div>
          <strong>{profile.name}</strong>
          <span>{profile.email}</span>
        </div>
      </UserInfo>

      <Nav>
        <ul>
          <li>
            <img src={iconOrigination} alt="Originação" />
            <Link to="/dashboard/originacao">Originação</Link>
          </li>

          <li>
            <img src={iconPeople} alt="Pessoas" />
            <Link to="/dashboard/pessoas">Pessoas</Link>
          </li>

          <li>
            <img src={iconImmobile} alt="Imovél" />
            <Link to="/dashboard/imovel">Imóvel</Link>
          </li>

          <li>
            <img src={iconProposal} alt="Proposta" />
            <Link to="/dashboard/proposta">Proposta</Link>
          </li>

          <li>
            <img src={iconContract} alt="Contrato" />
            <Link to="/dashboard/contrato">Contrato</Link>
          </li>
        </ul>
      </Nav>

      <Footer>
        <div>
          <img src={iconHome} alt="Home" />
          <span onClick={() => handleOperacao(null)}>Homepage</span>
        </div>
      </Footer>
    </Container>
  );
};

export default SideNavigation;
