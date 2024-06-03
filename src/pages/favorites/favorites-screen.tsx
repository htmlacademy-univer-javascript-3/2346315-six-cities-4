import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { FavoritesLogo } from '../../constants/constants.ts';

import Header from '../../components/header/header.tsx';
import ListFavorites from '../../components/favorites-list/favorites-list.tsx';
import EmptyFavorites from '../../components/empty-favorites/empty-favorites.tsx';

type FavoritesScreenProps = {
  favorites: Offer[];
};

function FavoritesScreen({favorites}: FavoritesScreenProps): JSX.Element {
  return(
    <div className="page">
      <Header favorites={favorites}/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favorites.length > 0 ?
            (<ListFavorites favorites={favorites}/>) :
            (<EmptyFavorites/>)}
        </div>
      </main>
      <footer className="footer container">
        <Link to="/" className="footer__logo-link" >
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={FavoritesLogo.Width} height={FavoritesLogo.Height} />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
