import { withSubscription } from './components/GoodsListExtends';
import FilterForm from "./components/FilterFormCross";

const List = withSubscription(FilterForm,2);
export default List;
