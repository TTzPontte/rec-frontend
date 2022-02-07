import React, { useCallback, useEffect, useState } from "react";
import Api from "@iso/api";

import { CollapsePersonalizado } from "@iso/components";
import { BlocoImovel, ModalFormImovel } from "./components";

import { Container, FloatButtonNovoImovel } from "./styled-components";

import { ReactComponent as IconNovaPessoa } from "@iso/assets/button-add.svg";

export default function Imovel({ uuid }) {
  const [imoveis, setImoveis] = useState([]);
  const [processo, setProcesso] = useState([]);
  const [documentosProcesso, setDocumentosProcesso] = useState([]);
  const [dividasProcesso, setDividasProcesso] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const api = new Api();

  const getImoveis = async () => {
    const processoImovel = await api.buscarProcessoByUuid(
      "/processo/".concat(uuid + "/0/1")
    );

    const { patrimonios: patrimoniosProcesso } = processoImovel;

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
    setProcesso(processoImovel);
  };

  const getImoveisCallback = useCallback(getImoveis, []);

  useEffect(() => {
    getImoveisCallback();
  }, [getImoveisCallback]);

  const handleAddListPatrimonio = (imovel) => {
    setImoveis((imoveis) => [...imoveis, imovel]);
  };

  const handleAddListDocument = (item) => {
    setDocumentosProcesso([...documentosProcesso, item]);
  };

  const handleRemoveListDocument = (anexoId) => {
    setDocumentosProcesso((documentos) =>
      documentos.filter((anexo) => anexo.id !== anexoId)
    );
  };

  const handleChangePatrimonio = (patrimonio) => {
    setImoveis(
      imoveis.map((imovel) => {
        if (imovel.id === patrimonio.id) {
          console.log("entrou", imovel.id);
          imovel = patrimonio;
        }
        return imovel;
      })
    );
  };

  const handleOpenCloseModal = () =>
    setIsOpenModal((isOpenModal) => !isOpenModal);


  return (
    <Container>
      {imoveis.map((patrimonio, index) => {
        return (
          <CollapsePersonalizado
            title={`IMÓVEL | ${patrimonio["endereco"] || ''} ${patrimonio["numero"]}`}
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
              handleRemoveListDocument={handleRemoveListDocument}
            />
          </CollapsePersonalizado>
        );
      })}

      <FloatButtonNovoImovel>
        <IconNovaPessoa
          onClick={handleOpenCloseModal}
          style={{ cursor: "pointer" }}
        />
        <ModalFormImovel
          isVisible={isOpenModal}
          handleIsDone={handleOpenCloseModal}
          processo={processo}
          handleAddListPatrimonio={handleAddListPatrimonio}
        />
      </FloatButtonNovoImovel>
    </Container>
  );
}
