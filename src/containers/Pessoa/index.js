import React, { useCallback, useEffect, useState } from "react";
import { Container, Content } from "./styles";
import { ReactComponent as IconTextNumber } from "../../assets/icon-text_number.svg";
import { CollapsePersonalizado } from "../../components/CollapsePersonalizado";
import InputPersonalizado from "../../components/InputPersonalizado";
import Api from "../../api";
import { mapperPessoa } from "./mapper";

export default function Pessoa({ uuid }) {
  const [envolvidos, setEnvolvidos] = useState([]);

  const api = new Api();

  const getEnvolvidos = async () => {
    const { envolvidos } = await api.buscarProcessoByUuid(
      "/processo/".concat(uuid + "/0/1")
    );
    console.log("envolvidos", envolvidos);
    if (envolvidos.length > 0) setEnvolvidos(envolvidos);
  };

  const getEnvolvidosCallback = useCallback(getEnvolvidos, []);

  useEffect(() => {
    getEnvolvidosCallback();
  }, [getEnvolvidosCallback]);

  return (
    <Container>
      {envolvidos.length > 0 &&
        envolvidos.map((envolvido, index) => {
          const { pessoa } = envolvido;

          return (
            pessoa && (
              <CollapsePersonalizado
                title={`PESSOA | ${
                  pessoa ? pessoa["nomeSocial"] || pessoa["nome"] : ""
                }`}
              >
                <Content>
                  <h2>INFORMAÇÕES DA PESSOA</h2>
                  {Object.entries(mapperPessoa).map(([key, fields]) => (
                    <div style={{ height: "70px" }}>
                      <InputPersonalizado
                        texto={fields.title}
                        valorCampo={pessoa[key]}
                        iconeLabel={fields.icon ?? <IconTextNumber />}
                        onSave={(value) => {
                          if (!value) return;

                          const novaPessoa = { ...pessoa, [key]: value };

                          api
                            .alterarPessoa(`/pessoa/${pessoa.id}`, novaPessoa)
                            .then(() => {
                              envolvidos[index] = {
                                ...envolvido,
                                pessoa: novaPessoa,
                              };
                              setEnvolvidos(envolvidos);
                              console.log(envolvidos);
                            });
                        }}
                        handleChange={() => {}}
                        idCampo={key}
                        editavel={true}
                      />
                    </div>
                  ))}
                </Content>
                <Content>
                  <h2>DOCUMENTOS</h2>
                </Content>
                <Content>
                  <h2>DIVIDAS</h2>
                </Content>
              </CollapsePersonalizado>
            )
          );
        })}
    </Container>
  );
}
