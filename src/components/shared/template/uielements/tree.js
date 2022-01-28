import { Tree } from 'antd';
import AntTree from './styles/tree.style';
import WithDirection from '@iso/lib/shared/template/helpers/rtl';
const WDTrees = AntTree(Tree);
const Trees = WithDirection(WDTrees);

const TreeNode = Tree.TreeNode;

export default Trees;
export { TreeNode };
