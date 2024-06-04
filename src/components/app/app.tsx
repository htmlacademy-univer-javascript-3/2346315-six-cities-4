import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants/constants.ts';
import { Offer } from '../../types/offer';
import { useAppSelector } from '../../hooks/index.ts';
import { browserHistory } from '../../browser-history.ts';
import { getAuthorizationStatus } from '../../store/user-slice/user-slice-selectors.ts';
import { getOffersLoadingStatus, getFavorites } from '../../store/offers-slice/offers-slice-selectors.ts';
import { getCity } from '../../store/app-settings-slice/app-settings-selectors.ts';

import LoadingScreen from '../../pages/loading-screen/loading-screen.tsx';
import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-router/history-router.tsx';


function App(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const loadingOffers = useAppSelector(getOffersLoadingStatus);
  const favorites: Offer[] = useAppSelector(getFavorites);
  const city = useAppSelector(getCity);

  if (authorizationStatus === AuthorizationStatus.Unknown || loadingOffers) {
    return <LoadingScreen/>;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen favorites={favorites} city={city}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <FavoritesScreen favorites={favorites}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen favorites={favorites}/>}
        />
        <Route
          path="*"
          element={<NotFoundScreen/>}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
