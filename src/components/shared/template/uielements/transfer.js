import { Transfer } from 'antd';
import AntTransfer from './styles/transfer.style';
import WithDirection from '@iso/lib/shared/template/helpers/rtl';
const WDTransfers = AntTransfer(Transfer);
const Transfers = WithDirection(WDTransfers);

export default Transfers;
