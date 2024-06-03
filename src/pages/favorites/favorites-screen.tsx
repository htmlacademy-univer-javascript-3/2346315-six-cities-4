import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { FAVORITES_LOGO_HEIGHT, FAVORITES_LOGO_WIDTH } from '../../components/constants/constants.ts';

import OfferCard from '../../components/offer-card/offer-card';
import Header from '../../components/header/header.tsx';

type FavoritesScreenProps = {
  favorites: Offer[];
};

function FavoritesScreen({favorites}: FavoritesScreenProps): JSX.Element {
  const favoritesMap = favorites.reduce((acc, offer) => {
    const { city: { name: cityName } } = offer;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {} as Record<string, Offer[]>);

  return(
    <div className="page">
      <Header favorites={favorites}/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.keys(favoritesMap).map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoritesMap[city].map((place) => (
                      <OfferCard key={place.id} offer={place} cardType={'typical'}/>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link to="/" className="footer__logo-link" >
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={FAVORITES_LOGO_WIDTH} height={FAVORITES_LOGO_HEIGHT} />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
