import axios from 'axios';

class Api {
  constructor() {
    this.service = axios.create({ baseURL: 'http://localhost:5000' });
  }

  async busca(url, setDado) {
    const resposta = await this.service.get(url);
    setDado(resposta.data);
  }
}

export default Api;
