import { useState, useEffect } from 'react';
import { Offer } from '../../types/offer.ts';
import { useAppSelector } from '../../hooks/index.ts';
import { Cities } from '../../cities-list.ts';

import OffersList from '../../components/offers-list/offers-list.tsx';
import Map from '../../components/map/map.tsx';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import OfferCardsSorting from '../../components/offer-cards-sorting/offer-cards-sorting.tsx';
import Header from '../../components/header/header.tsx';

type MainScreenProps = {
  favorites: Offer[];
}

function MainScreen({favorites}: MainScreenProps): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const city = useAppSelector((state) => state.city);

  const [currentCityOffers, setCurrentCityOffers] = useState<Offer[]>(offers);
  const currentCity = currentCityOffers.length > 0 ? currentCityOffers[0].city : offers[0].city;

  useEffect(() => {
    setCurrentCityOffers(offers.filter((offer) => offer.city.name === city));
  }, [city, offers]);

  return (
    <div className="page page--gray page--main">
      <Header favorites={favorites}/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={Cities}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${currentCityOffers.length} places to stay in ${city}`}</b>
              <OfferCardsSorting/>
              <OffersList offers={currentCityOffers} listType={'typical'} />
            </section>
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
