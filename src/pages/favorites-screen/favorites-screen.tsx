import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import OfferCard from '../../components/offer-card/offer-card';
import { City } from '../../types/city';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteOffers } from '../../store/actions';

function FavoritesScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(fetchFavoriteOffers());
  const favorites = useAppSelector((state) => state.favorites);
  const favoritesCity = new Set<City['name']>();
  const favoritesOffers = favorites.sort((a, b) => (a.city.name > b.city.name ? 1 : -1));

  favoritesOffers.map(({city}) => favoritesCity.add(city.name));

  return(
    <div className="page">
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Array.from(favoritesCity).map((city) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoritesOffers.map((offer) => {
                      if(offer.city.name === city) {
                        return <OfferCard key={offer.id} offer={offer} block='favorites' size='small' />;
                      }
                    })}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default FavoritesScreen;
