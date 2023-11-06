import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Locations from '../../components/locations/locations';
import { OfferPreview } from '../../types/offer-preview';
import { insertPlural } from '../../utils/common';
import { OffersList } from '../../components/offers-list/offers-list';
import { useState } from 'react';
import { City } from '../../types/city';
import { Map } from '../../components/map/map';
import { EpmtyList } from '../../components/empty-list/empty-list';
import classNames from 'classnames';

type MainProp = {
  offers: OfferPreview[];
}

function MainScreen({offers}: MainProp): JSX.Element {
  const [activeCity, setActiveCity] = useState<City['name']>('Amsterdam');
  const locationActiveCity = offers.find(({city}) => city.name === activeCity)?.city as City;

  function handleCityClick(city: City['name']) {
    //evt.Deafault ????
    setActiveCity(city);
  }

  const [activeCard, setActiveCard] = useState<OfferPreview| null>(null);

  function handleCardHover(offer: OfferPreview | null) {
    setActiveCard(offer);
  }

  const filteredOffersByCity = offers.filter((offer) => offer.city.name === activeCity);

  const offersLength = filteredOffersByCity.length;
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
          <Locations
            activeCity={activeCity}
            onCityClick={handleCityClick}
          />
        </div>
        <div className="cities">
          {
            !offersLength ? <EpmtyList activeCity={activeCity} /> :
              (
                <div className="cities__places-container container">
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{offersLength} place{insertPlural(offersLength)} to stay in {activeCity}</b>
                    <form className="places__sorting" action="#" method="get">
                      <span className="places__sorting-caption">Sort by</span>
                      <span className="places__sorting-type" tabIndex={0}>
                      &nbsp;Popular
                        <svg className="places__sorting-arrow" width="7" height="4">
                          <use xlinkHref="#icon-arrow-select"></use>
                        </svg>
                      </span>
                      <ul className="places__options places__options--custom places__options--opened">
                        <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                        <li className="places__option" tabIndex={0}>Price: low to high</li>
                        <li className="places__option" tabIndex={0}>Price: high to low</li>
                        <li className="places__option" tabIndex={0}>Top rated first</li>
                      </ul>
                    </form>
                    <OffersList block='cities' offers={filteredOffersByCity} onCardHover={handleCardHover}/>
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
