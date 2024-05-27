import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../constants/constants';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import { listFilling } from '../../store/action.ts';


import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen';
import PrivateRoute from '../private-route/private-route';


type AppScreenProps = {
  reviews: Review[];
};

function App({reviews}: AppScreenProps): JSX.Element {
  const offers: Offer[] = useAppSelector((state) => state.offers);
  const favorites = offers.filter((o) => o.isFavorite);
  const dispatch = useAppDispatch();
  dispatch(listFilling());

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen favorites={favorites}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavoritesScreen favorites={favorites}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen reviews={reviews} favorites={favorites}/>}
        />
        <Route
          path="*"
          element={<NotFoundScreen/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;