import styles from './styles.module.scss';
import filter from '@icons/filterSortLocationBar/filter.svg';
import argentina from '@icons/filterSortLocationBar/argentina.svg';
import ModalFilter from '../modal-filter/ModalFilter';
import SortSelect from '../sort-select/SortSelect';
import ModalCustom from '../modal-custom/ModalCustom';
import { useState } from 'react';
import useSelectorSortFilter from '@src/common/hooks/useSelectorSortFilter';

const FilterSortLocationBar = () => {
	const [filterModal, setFilterModal] = useState(false);
	const toggleFilterModal = () => {
		setFilterModal((prevFilterModal) => !prevFilterModal);
	};
	const {filters, sorts, actionFilter, actionSort} = useSelectorSortFilter({role: 'owner'});

	return (
		<nav className={styles.navContainer}>
			<div className={styles.locationContainer}>
				<img src={argentina} alt='peru' />
				<h4>Argentina</h4>
			</div>
			<SortSelect sorts={sorts} actionSort={actionSort} />
			<div className={styles.filterContainer} onClick={toggleFilterModal}>
				<h4>Filtros</h4>
				<img src={filter} alt='filter' />
			</div>
			<ModalCustom state={filterModal} toggleModal={toggleFilterModal} isWarning={true}>
				<ModalFilter filters={filters} action={actionFilter} />
			</ModalCustom>
		</nav>
	);
};

export default FilterSortLocationBar;
