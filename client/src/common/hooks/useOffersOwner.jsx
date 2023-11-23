import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	actionGetOffersOwner,
	actionSetOffersOwner,
} from '../store/actions/offersActions';
import { sortOffersOwner } from '../utils/helpers-redux/sortOffersOwner';
import { filterOffersOwner } from '../utils/helpers-redux/filterOffersOwner';

const useOffersOwner = () => {
	const dispatch = useDispatch();
	const offersOwner = useSelector((state) => state.offersReducer.offersOwner);
	const sortsOffersOwner = useSelector(
		(state) => state.offersReducer.sortOffersOwner
	);
	const offersOwnerInmutable = useSelector(
		(state) => state.offersReducer.offersOwnerInmutable
	);
	const filtersOffersOwner = useSelector(
		(state) => state.offersReducer.filtersOffersOwner
	);

	useEffect(() => {
		if (offersOwnerInmutable.length === 0) {
			dispatch(actionGetOffersOwner());
		}
		let filteredOffers = filterOffersOwner(offersOwnerInmutable, filtersOffersOwner);
		let sortedOffers = sortOffersOwner(filteredOffers, sortsOffersOwner);
		dispatch(actionSetOffersOwner(sortedOffers));

	}, [dispatch, offersOwnerInmutable.length, sortsOffersOwner,filtersOffersOwner]);

	return offersOwner;
};

export default useOffersOwner;
