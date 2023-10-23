import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import { AppRoutes, AuthorizationStatus } from '../../const/const';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { HelmetProvider } from 'react-helmet-async';
type AppProps = {
  offers: number;
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
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route path={AppRoutes.Offer} element={<OfferScreen />}/>
          <Route path='*' element={<NotFoundScreen />}/>


        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
