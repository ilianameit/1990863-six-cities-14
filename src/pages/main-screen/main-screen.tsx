import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Locations from '../../components/locations/locations';
import { OfferPreview } from '../../types/offer-preview';
import { insertPlural } from '../../utils/common';
import { OffersList } from '../../components/offers-list/offers-list';
import { useEffect, useState } from 'react';
import { City } from '../../types/city';
import { Map } from '../../components/map/map';
import { EmptyList } from '../../components/empty-list/empty-list';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveCity, setSortingItem } from '../../store/actions';
import { SortingOffers } from '../../components/sorting-offfers/sorting-offers';
import { Sorting } from '../../types/sorting';
import { getSortedOffers } from '../../store/selectors';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const offers = useAppSelector((state) => state.offers);
  const activeCity = useAppSelector((state) => state.activeCity);

  const [searchParams, ] = useSearchParams({city: activeCity});
  const activeCityParam = searchParams.get('city') as City['name'];

  useEffect(() => {
    dispatch(setActiveCity(activeCityParam)); // - хотела менять глобальное состояние activeCity.
  }, [activeCityParam, dispatch]);
  const locationActiveCity = offers.find(({city}) => city.name === activeCity)?.city as City; //update: offera с локацией города может не быть

  const [activeCard, setActiveCard] = useState<OfferPreview['id'] | null>(null);

  function handleCardHover(id: OfferPreview['id'] | null) {
    setActiveCard(id);
  }
  const filteredOffersByCity = offers.filter((offer) => offer.city.name === activeCity);

  const offersLength = filteredOffersByCity.length;

  const sortingByItem = useAppSelector((state) => state.sotringByItem);
  function handleSortingItemClick(type: Sorting) {
    dispatch(setSortingItem(type));
  }

  const sortedOffers = getSortedOffers({offers: filteredOffersByCity, sortingItem: sortingByItem});

  return (
    //header авторизован/неавторизован
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <Header/>

      <main className={classNames(
        'page__main',
        'page__main--index',
        {'page__main--index-empty': !offersLength}
      )}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations activeCity={activeCity} />
        </div>
        <div className="cities">
          {
            !offersLength ? <EmptyList activeCity={activeCity} /> :
              (
                <div className="cities__places-container container">
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{offersLength} place{insertPlural(offersLength)} to stay in {activeCity}</b>
                    <SortingOffers sortingByItem={sortingByItem} onChange={handleSortingItemClick}/>
                    <OffersList block='cities' offers={sortedOffers} onCardHover={handleCardHover}/>
                  </section>
                  <div className="cities__right-section">
                    <Map
                      block='cities'
                      city={locationActiveCity}
                      offers={offers}
                      selectedOffer={activeCard}
                    />
                  </div>
                </div>
              )
          }
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
