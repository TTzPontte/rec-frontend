import { Progress } from 'antd';
import AntProgress from './styles/progress.style';
import WithDirection from '@iso/lib/shared/template/helpers/rtl';
const WDProgress = AntProgress(Progress);
const isoProgress = WithDirection(WDProgress);

export default isoProgress;
