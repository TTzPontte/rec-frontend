import axios from 'axios';

class Api {
  constructor() {
    this.service = axios.create({ baseURL: 'http://localhost:5000' });
  }

  async busca(url, setDado) {
    const resposta = await this.service.get(url);
    setDado(resposta.data);
  }


  async buscarProcessoByUuid(url) {
    const resposta = await this.service.get(url);
    console.log('resposta')
    console.log(resposta.data[0])
    return resposta.data[0];
  }

  async salvarProcesso(url, formValues) {
    const response = await this.service.patch(url, formValues);
  }
}

export default Api;
