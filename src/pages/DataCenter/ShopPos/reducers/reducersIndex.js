const initialState = {
	spShopId: '',
};
const index = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_SHOPID':
			return {
				...state,
				spShopId: action.payload,
			};
		default:
			return state;
	}
};
export default index;
