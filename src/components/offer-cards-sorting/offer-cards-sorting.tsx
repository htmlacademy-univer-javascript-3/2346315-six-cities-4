import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import { selectSortType } from '../../store/app-settings-slice/app-settings-slice.ts';
import { SORT_TYPES, SORTING_HEIGHT, SORTING_WIDTH } from '../../constants/constants.ts';
import { getSortType } from '../../store/app-settings-slice/app-settings-selectors.ts';

function OfferCardsSorting() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const selectedSortType = useAppSelector(getSortType);

  const dispatch = useAppDispatch();
  const onSortTypeSelected = (sortType: string) => {
    dispatch(selectSortType(sortType));
    setDropdownOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get" onClick={() => setDropdownOpen(!isDropdownOpen)}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {selectedSortType}
        <svg className="places__sorting-arrow" width={SORTING_WIDTH} height={SORTING_HEIGHT}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isDropdownOpen ? 'places__options--opened' : ''}`}>
        {Object.entries(SORT_TYPES).map(([key, sortType]) => (
          <li key={key}
            className={`places__option ${selectedSortType === sortType ? 'places__option--active' : ''}`}
            onClick={() => onSortTypeSelected(sortType)}
            tabIndex={0}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default OfferCardsSorting;
