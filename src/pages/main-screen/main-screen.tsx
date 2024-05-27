import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer.ts';
import { useAppSelector } from '../../hooks/index.ts';
import { Cities } from '../../cities-list.ts';

import OffersList from '../../components/offers-list/offers-list.tsx';
import Map from '../../components/map/map.tsx';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import OfferCardsSorting from '../../components/offers-cards-sorting/offers-cards-sorting.tsx';

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
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to='/' className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <Link to="/favorites">
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">{favorites.length}</span>
                    </Link>
                  </a>
                </li>
                <li className="header__nav-item">
                  <div className="header__nav-link">
                    <span className="header__signout">Sign out</span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
                <Map city={currentCity} points={currentCityOffers} isMainPage/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;