const initialState = {
	currentPage: 1,
	everyPage: 15,
	total: 0,
	dataList: [],
	activeKey: '1',
	newUserGiftId: '',
};
const index = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_TABLELIST':
			return {
				...state,
				...action.payload,
			};
		case 'SET_NEWUSER_GIFTID':
			return {
				...state,
				newUserGiftId: action.payload.newUserGiftId,
			};
		case 'SET_ACTIVEKEY':
			return {
				...state,
				activeKey: action.payload.activeKey,
			};
		default:
			return state;
	}
};
export default index;
