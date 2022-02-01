import React from "react";
import { CollapsePersonalizado } from "@iso/components";
import { Container, Content } from "./styled-components";

export default function Imovel({ uuid }) {
  return (
    <Container>
      {[{ id: 1 }].map((envolvido, index) => {
        return (
          <CollapsePersonalizado
            title={`IMOVEL  |  MINHA CASA, MINHA VIDA`}
            key={envolvido.id}
            startOpen={index === 0 ? true : false}
          >
            <Content>
              <header>INFORMAÇÕES GERAIS</header>
            </Content>

            <Content>
              <header>DOCUMENTOS</header>
            </Content>

            <Content>
              <header>DÍVIDAS</header>
            </Content>
          </CollapsePersonalizado>
        );
      })}
    </Container>
  );
}
