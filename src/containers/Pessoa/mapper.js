import React from "react";
import { ReactComponent as IconEmail } from "../../assets/icon-email-14x14.svg";

export const mapperPessoa = {
  nome: {
    title: "Nome da Pessoa:",
    onSave: () => {},
  },
  nomeMae: {
    title: "Nome da mãe:",
    onSave: () => {},
  },
  email: {
    title: "Email:",
    onSave: () => {},
    icon: <IconEmail />,
  },
  cnpj: {
    title: "CNPJ",
    onSave: () => {},
  }
};
