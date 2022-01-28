import axios from 'axios';
import history from '@iso/lib/shared/template/helpers/history';
const api = axios.create({
  //LOCAL
  baseURL: 'http://localhost:8081',

});

// api.interceptors.response.use(
//   (response) => {
//     console.log('passou no interceptor com sucesso');
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 403) {
//       logout();
//     }
//     return error.response;
//   }
// );

const logout = () => {
  localStorage.removeItem('id_token');
  history.replace('/');
};

export default api;
