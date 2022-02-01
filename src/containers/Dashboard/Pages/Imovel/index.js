import React, { useCallback, useEffect, useState } from "react";
import { CollapsePersonalizado } from "@iso/components";
import { Container, Content } from "./styled-components";
import Api from "@iso/api";

export default function Imovel({ uuid }) {
  const [imoveis, setImoveis] = useState([]);
  
  const api = new Api();

  const getImoveis = async () => {
    const { patrimonios } = await api.buscarProcessoByUuid(
      "/processo/".concat(uuid + "/0/1")
    );

    setImoveis(patrimonios);
  };

  const getImoveisCallback = useCallback(getImoveis, []);

  useEffect(() => {
    getImoveisCallback();
  }, [getImoveisCallback]);

  return (
    <Container>
      {imoveis.map((imovel, index) => {
        console.log(imovel);
        return (
          <CollapsePersonalizado
            title={`IMOVÉL | ${imovel.patrimonio["endereco"]} ${imovel.patrimonio["numero"]}`}
            key={imovel.id}
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
