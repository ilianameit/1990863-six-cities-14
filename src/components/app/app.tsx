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
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuthAction, fetchOffersAction } from '../../store/api-actions';
import { useEffect } from 'react';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <HelmetProvider>

      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoutes.Main} element={<MainScreen/>}/>
          <Route path={AppRoutes.Login} element={<LoginScreen />}/>
          <Route
            path={AppRoutes.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <FavoritesScreen/>
              </PrivateRoute>
            }
          />
          <Route path={`${AppRoutes.Offer}/:id`} element={<OfferScreen/>}/>
          <Route path='*' element={<NotFoundScreen />}/>


        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
