import { useMemo } from 'react';
import { Offer } from '../../types/offer.ts';
import { useAppSelector } from '../../hooks/index.ts';
import { Cities } from '../../cities-list.ts';
import { CitiesListMemo } from '../../components/cities-list/cities-list.tsx';
import { getOffers } from '../../store/offers-slice/offers-slice-selectors.ts';

import Map from '../../components/map/map.tsx';
import Header from '../../components/header/header.tsx';
import EmptyOffer from '../../components/main-empty/main-empty.tsx';
import CityPlaces from '../../components/city-places/city-places.tsx';

type MainScreenProps = {
  favorites: Offer[];
  city: string;
}

function MainScreen({favorites, city}: MainScreenProps): JSX.Element {
  const offers = useAppSelector(getOffers);

  const currentCityOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === city),
    [offers, city]
  );

  const currentCity = currentCityOffers.length > 0 ? currentCityOffers[0].city : offers[0].city;

  return (
    <div className="page page--gray page--main">
      <Header favorites={favorites}/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesListMemo cities={Cities}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {currentCityOffers.length > 0 ?
              (<CityPlaces city={city} offers={currentCityOffers}/>) :
              (<EmptyOffer city={city}/>)}
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={currentCity} points={currentCityOffers} specialCaseId={undefined} isMainPage/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
