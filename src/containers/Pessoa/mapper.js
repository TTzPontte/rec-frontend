import React from "react";
import { ReactComponent as IconEmail } from "../../assets/icon-email-14x14.svg";
import Api from "../../api";

const api = new Api();

export const mapperPessoa = {
  nome: {
    title: "Nome da Pessoa:",
    component: "Input"
  },
  processo_envolvidos: {
    title: "Papel na operação:",
    getItem: () => api.buscarTabelaDM('dm-processo-tipo'),
    component: "DropDown"
  },
  email: {
    title: "Email:",
    icon: <IconEmail />,
  },
};
