import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants/constants.ts';
import { Offer } from '../../types/offer';
import { useAppSelector } from '../../hooks/index.ts';
import { browserHistory } from '../../browser-history.ts';
import { getAuthorizationStatus } from '../../store/user-slice/user-slice-selectors.ts';
import { getOffersLoadingStatus, getOffers } from '../../store/offers-slice/offers-slice-selectors.ts';

import LoadingScreen from '../../pages/loading-screen/loading-screen.tsx';
import MainScreen from '../../pages/main-screen/main-screen';
import FavoritesScreen from '../../pages/favorites/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-router/history-router.tsx';


function App(): JSX.Element {

  const offers: Offer[] = useAppSelector(getOffers);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const loadingOffers = useAppSelector(getOffersLoadingStatus);
  const favorites = offers.filter((o) => o.isFavorite);

  // const offers: Offer[] = useAppSelector((state) => state.offers);
  // const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  // const loadingOffers = useAppSelector((state) => state.isOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || loadingOffers) {
    return <LoadingScreen/>;
  }

  return (
    <HistoryRouter history={browserHistory}>
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
