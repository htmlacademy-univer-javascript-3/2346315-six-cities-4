import { Route, BrowserRouter, Routes } from 'react-router-dom';
import MainScreen from './pages/main-screen/main-screen';
import { AppRoute, AuthorizationStatus } from '../../src/routes';
import LoginScreen from './pages/login-screen/login-screen';
import FavoritesScreen from './pages/favorites-screens/favorites-screen';
import OfferScreen from './pages/offer-screens/offer-screen';
import ErrorScreen from './pages/404-error-screen/404-error-screen';
import PrivateRoute from './private-route';
import { OfferType } from '../mocks/offers';

type AppProps = {
    offers: OfferType[];
  }

function App({offers}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen offers={offers}/>}
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
              <FavoritesScreen offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen/>}
        />
        <Route
          path="*"
          element={<ErrorScreen/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;