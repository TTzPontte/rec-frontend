import React, { useEffect } from "react";
import {
  Container,
  Header,
  Main,
  BtnGoogle,
  Message,
  Logo,
  Form,
} from "./styled-components";
import { ReactComponent as SvgLogoPontte } from "@iso/assets/logo-pontte.svg";
import { ReactComponent as IconHeart } from "@iso/assets/icon-heart.svg";
import LogoGoogle from "@iso/assets/logo-google.svg";
import { logInAct } from "@iso/redux/auth/actions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

export default function Login() {
  const history = useHistory();
  const Auth = useSelector(({ Auth }) => Auth);

  const hasError = Auth.hasError;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!Auth.credentials.tokenId) {
      history.push("/dashboard");
    }
  }, [Auth.credentials.tokenId, history]);

  const handlerLogIn = () => dispatch(logInAct());

  return (
    <Container>
      <Header>
        <Logo>
          <SvgLogoPontte
            style={{
              width: "160px",
              height: "36px",
              color: "#5C3B6B",
            }}
          />
        </Logo>
      </Header>
      <Main>
        <Form>
          <header>LOGIN - BASE CADASTRAL</header>
          <main>
            <BtnGoogle onClick={handlerLogIn}>
              <img src={LogoGoogle} alt="Logo Google" />
              <span> Login com o Google </span>
            </BtnGoogle>
          </main>
        </Form>

        {(() =>
          hasError && (
            <Message className="errorLogin">
              Parece que algo deu errado! Que tal tentarmos novamente?
            </Message>
          ))()}

        <Message
          style={hasError ? { animation: "1s ease-out 0s 1 downMessage" } : {}}
        >
          <p
            style={{
              display: "flex",
              alignItems: "center",
              userSelect: "none",
            }}
          >
            Feito com
            <span>
              <IconHeart
                style={{
                  height: "14px",
                }}
              />
            </span>
            pela Pontte
          </p>
        </Message>
      </Main>
    </Container>
  );
}
