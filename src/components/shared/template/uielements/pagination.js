import { Pagination } from 'antd';
import AntPagination from './styles/pagination.style';
import WithDirection from '@iso/lib/shared/template/helpers/rtl';
const Paginations = AntPagination(Pagination);
const isoPagination = WithDirection(Paginations);

export default isoPagination;
