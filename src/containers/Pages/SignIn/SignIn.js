import React from "react";
import {
  Container,
  Header,
  Main,
  BtnGoogle,
  Message,
  Logo,
  Form,
} from "./SignIn.styles";
import { ReactComponent as SvgLogoPontte } from "@iso/assets/logo-pontte.svg";
import LogoGoogle from "@iso/assets/logo-google.svg";
import { logInAct } from "@iso/redux/auth/actions";
import { useSelector, useDispatch } from "react-redux";

export default function SignIn() {
  const Auth = useSelector(({Auth}) => Auth);
  console.log(Auth);
  const hasError = Auth.hasError;
  const dispatch = useDispatch();

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
          Feito com
          <span> ♥ </span>
          pela Pontte
        </Message>
      </Main>
    </Container>
  );
}
