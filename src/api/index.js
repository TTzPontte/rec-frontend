import axios from 'axios';

// export const api = axios.create({ baseURL: 'http://localhost:5000' });

// export const busca = async (url, setDado) => {
//   const resposta = await api.get(url);
//   setDado(resposta.data);
// };

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
