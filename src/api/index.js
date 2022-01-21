import StringUtils from "../utils/StringUtils";
import { AxiosCustom } from "./axios.custom";

class Api {
  constructor() {
    this.service = AxiosCustom.getService();
  }

  async busca(url, setDado) {
    const resposta = await this.service.get(url);
    setDado(resposta.data);
  }

  async buscarProcessoByUuid(url) {
    const resposta = await this.service.get(url);
    return resposta.data[0];
  }

  async salvarPessoaNoProcesso(dados) {
    let processo = null;
    try {
      processo = await this.buscarProcessoByUuid('/processo/'.concat(dados.processo + '/0/1'));
    } catch (e) {
      return e.message;
    }

    if (!StringUtils.isNotNull(processo)) {
      return "Processo não encontrado na base de dados.";
    }

    let retorno = {};
    let pessoa = null;
    if (StringUtils.isNotNull(dados.pessoaTipo) && dados.pessoaTipo === "PF") {
      pessoa = {nome: dados.nome, cpf: dados.cpf, pessoaTipo: 'PF'};
    }
    if (StringUtils.isNotNull(dados.pessoaTipo) && dados.pessoaTipo === "PJ") {
      pessoa = {razaoSocial: dados.razaoSocial, cnpj: dados.cnpj, pessoaTipo: 'PJ'};
    }  
    if (StringUtils.isNotNull(pessoa)) {
      try {
        let resposta = await this.service.post('/pessoa', pessoa);
        pessoa = resposta.data;
      } catch (e) {
        retorno = e.message;
      }    
    }  
    if (StringUtils.isNotNull(pessoa) && StringUtils.isNotNull(pessoa.id) && StringUtils.isNotNull(processo) && StringUtils.isNotNull(processo.id)) {
      let processoEnvolvidos = {tipo: dados.envolvimento, pessoa: {id: pessoa.id}, processo: {id: processo.id}};
      try {
        let resposta = await this.service.post('/processo-envolvidos', processoEnvolvidos);
        processoEnvolvidos = resposta.data;
        retorno = processoEnvolvidos;
      } catch (e) {
        retorno = e.message;
      }
    }
    return retorno;
  }

  async salvarProcesso(url, formValues) {
    return await this.service.patch(url, formValues);
  }
  
  async alterarProcesso(url, formValues) {
    return await this.service.patch(url, formValues);
  }

  async buscarProcesso(endpoint) {
    return await this.service.get(endpoint);
  }

  async deletar(endpoint) {
    return await this.service.delete(endpoint);
  }

  async buscarTabelaDM(endpoint) {
    return await this.service.get(endpoint);
  }

  async addItemDM(endpoint, payload) {
    return await this.service.post(endpoint, payload);
  }

  async salvar(endpoint, payload){
    return await this.service.post(endpoint, payload);
  }

  async downloadFile(endpoint, fileName) {
    const { data: blob } = await this.service.get(endpoint, {
      responseType: "blob",
      transformRequest: [
        (data, headers) => delete headers.common["Authorization"] && data,
      ],
    });

    const url = window.URL.createObjectURL(blob);
    const elementDownload = document.createElement("a");
    elementDownload.href = url;
    elementDownload.setAttribute("download", fileName);
    elementDownload.click();
  }

  async verifyTokenId({ tokenId }) {
    try {
      console.log("verificando token id...");
      return !!(await this.service.post("/auth/login", null, {
        headers: {
          Authorization: tokenId,
        },
      }));
    } catch {
      return false;
    }
  }
}

export default Api;
