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

  return (
    <Container>
      <Header>
        <SvgLogoPontte
          style={{
            width: "120px",
            height: "60px",
            color: "#5C3B6B",
            marginLeft: "10px",
            cursor: "pointer",
          }}
          onClick={() => handleOperacao(null)}
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
            <div className="navButton">
              <img src={iconOrigination} alt="Originação" />
              <Link to="/dashboard/originacao">Originação</Link>
            </div>
          </li>

          <li>
            <div className="navButton">
              <img src={iconPeople} alt="Pessoas" />
              <Link to="/dashboard/pessoas">Pessoas</Link>
            </div>
          </li>

          <li>
            <div className="navButton">
              <img src={iconImmobile} alt="Imovél" />
              <Link to="/dashboard/imovel">Imóvel</Link>
            </div>
          </li>

          <li>
            <div className="navButton">
              <img src={iconProposal} alt="Proposta" />
              <Link to="/dashboard/proposta">Proposta</Link>
            </div>
          </li>

          <li>
            <div className="navButton">
              <img src={iconContract} alt="Contrato" />
              <Link to="/dashboard/contrato">Contrato</Link>
            </div>
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
