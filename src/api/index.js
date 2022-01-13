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
    console.log("resposta");
    console.log(resposta.data[0]);
    return resposta.data[0];
  }

  async alterarProcesso(url, formValues) {
    return await this.service.patch(url, formValues);
  }

  async buscarPessoa(id){
    return await this.service.get(`pessoa?id=${id}`)
  }

  async buscarTabelaDM(endpoint) {
    return await this.service.get(endpoint);
  }

  async addItemDM(endpoint, payload){
    return await this.service.post(endpoint, payload)
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
