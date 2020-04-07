import FilterForm from "./components/FilterFormGeneral";
import { withSubscription } from './components/GoodsListExtends';
const List = withSubscription(FilterForm,1);
export default List;
