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

  async salvarProcesso(url, formValues) {
    const response = await this.service.patch(url, formValues);
  }
}

export default Api;
