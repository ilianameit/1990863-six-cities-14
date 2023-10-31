import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import { AppRoutes, authorizationStatus } from '../../const/const';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { HelmetProvider } from 'react-helmet-async';
import { Offer } from '../../types/offer';
type AppProps = {
  offers: Offer[];
}

function App({offers}: AppProps): JSX.Element {
  return (
    <HelmetProvider>

      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoutes.Main} element={<MainScreen offers={offers}/>}/>
          <Route path={AppRoutes.Login} element={<LoginScreen />}/>
          <Route
            path={AppRoutes.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <FavoritesScreen offers={offers}/>
              </PrivateRoute>
            }
          />
          <Route path={`${AppRoutes.Offer}/:id`} element={<OfferScreen offers={offers}/>}/>
          <Route path='*' element={<NotFoundScreen />}/>


        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
