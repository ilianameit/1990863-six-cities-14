import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '..';
import { setActiveCity, setSortingItem } from '../../store/actions';
import { getSortedOffers } from '../../store/selectors';
import { City } from '../../types/city';
import { OfferPreview } from '../../types/offer-preview';
import { Sorting } from '../../types/sorting';

export const useMainScreen = () => {
  const dispatch = useAppDispatch();

  const offers = useAppSelector((state) => state.offers);
  const activeCity = useAppSelector((state) => state.activeCity);

  const [searchParams, ] = useSearchParams({city: activeCity});
  const activeCityParam = searchParams.get('city') as City['name'];

  useEffect(() => {
    dispatch(setActiveCity(activeCityParam));
  }, [activeCityParam, dispatch]);
  const locationActiveCity = offers.find(({city}) => city.name === activeCity)?.city as City;

  const [activeCard, setActiveCard] = useState<OfferPreview['id'] | null>(null);

  const handleCardHover = useCallback((id: OfferPreview['id'] | null) => {
    setActiveCard(id);
  }, []);
  const filteredOffersByCity = offers.filter((offer) => offer.city.name === activeCity);

  const offersLength = filteredOffersByCity.length;

  const sortingByItem = useAppSelector((state) => state.sotringByItem);
  const handleSortingItemClick = (type: Sorting) => {
    dispatch(setSortingItem(type));
  };

  const sortedOffers = getSortedOffers({offers: filteredOffersByCity, sortingItem: sortingByItem});

  return [offers, activeCity, offersLength, locationActiveCity, sortingByItem, handleSortingItemClick, handleCardHover, sortedOffers, activeCard];
};

//деструктуризация объединяет все типы для каждого
