import React, { useCallback, useEffect, useState } from "react";
import Api from "@iso/api";

import { CollapsePersonalizado } from "@iso/components";
import { BlocoImovel } from "./components";

import { Container } from "./styled-components";

export default function Imovel({ uuid }) {
  const [imoveis, setImoveis] = useState([]);
  const [documentosProcesso, setDocumentosProcesso] = useState([]);
  const [dividasProcesso, setDividasProcesso] = useState([]);

  const api = new Api();

  const getImoveis = async () => {
    const { patrimonios: patrimoniosProcesso } = await api.buscarProcessoByUuid(
      "/processo/".concat(uuid + "/0/1")
    );

    const documentos = [];
    const dividas = [];
    const patrimonios = [];

    await Promise.all(
      patrimoniosProcesso.map(async ({ patrimonio }) => {
        const { data } = await api.buscarProcesso(
          `/patrimonio-anexo?patrimonio=${patrimonio.id}`
        );
        documentos.push(...data);
      })
    );

    await Promise.all(
      patrimoniosProcesso.map(async ({ patrimonio }) => {
        const { data } = await api.buscarProcesso(
          `/patrimonio-divida?patrimonio=${patrimonio.id}`
        );
        dividas.push(...data);
      })
    );

    await Promise.all(
      patrimoniosProcesso.map(async ({ patrimonio }) => {
        const { data } = await api.buscarProcesso(
          `/patrimonio?id=${patrimonio.id}`
        );
        patrimonios.push(...data);
      })
    );

    setDividasProcesso(dividas);
    setDocumentosProcesso(documentos);
    setImoveis(patrimonios);
  };

  const getImoveisCallback = useCallback(getImoveis, []);

  useEffect(() => {
    getImoveisCallback();
  }, [getImoveisCallback]);

  const handleAddListDocument = (item) => {
    setDocumentosProcesso([...documentosProcesso, item]);
  };

  const handleChangePatrimonio = (patrimonio) => {
    setImoveis(
      imoveis.map((imovel) => {
        console.log(imovel, patrimonio);
        if (imovel.patrimonio?.id === patrimonio.id) {
          imovel.patrimonio = patrimonio;
        }
        return imovel;
      })
    );
  };

  return (
    <Container>
      {imoveis.map((patrimonio, index) => {
        return (
          <CollapsePersonalizado
            title={`IMÓVEL | ${patrimonio["endereco"]} ${patrimonio["numero"]}`}
            key={patrimonio.id}
            startOpen={index === 0 ? true : false}
          >
            <BlocoImovel
              patrimonio={patrimonio}
              handleChangePatrimonio={handleChangePatrimonio}
              documentosPatrimonio={documentosProcesso.filter(
                (d) => d.patrimonio.id === patrimonio.id
              )}
              dividasPatrimonio={dividasProcesso.filter(
                (d) => d.patrimonio.id === patrimonio.id
              )}
              handleAddListDocument={handleAddListDocument}
            />
          </CollapsePersonalizado>
        );
      })}
    </Container>
  );
}
