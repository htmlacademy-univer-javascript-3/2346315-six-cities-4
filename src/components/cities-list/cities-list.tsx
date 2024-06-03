import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCity } from '../../store/app-settings-slice/app-settings-selectors';
import { changeCity } from '../../store/app-settings-slice/app-settings-slice';
import { memo } from 'react';

type CitiesListProps = {
  cities: { name: string; id: number }[];
};

type CityProps = {
  name: string;
  cityChangeName: (city: string) => void;
  isActive: boolean;
};

const City = ({name, cityChangeName, isActive}: CityProps): JSX.Element => (
  <li className="locations__item" onClick={() => cityChangeName(name)}>
    <a className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} href="#">
      <span>{name}</span>
    </a>
  </li>
);

function CitiesList({cities}: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCity);

  const handleCityChange = (city: string) => {
    dispatch(changeCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <City
          key={city.id}
          name={city.name}
          cityChangeName={handleCityChange}
          isActive={city.name === currentCity}
        />
      ))}
    </ul>
  );
}

export const CitiesListMemo = memo(CitiesList);
