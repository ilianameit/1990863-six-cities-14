import { Link } from 'react-router-dom';
import { CityName } from '../../const/const';
import { City } from '../../types/city';
import classNames from 'classnames';

//getParametr исправить маршрутизацию

type LocationsProp = {
  activeCity: City['name'];
  onCityClick: (city: City['name']) => void;
}
//остаются странные полосы при переключении города
function Locations({activeCity, onCityClick}: LocationsProp): JSX.Element {
  return(
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CityName.map((city) => (
          <li
            key={city}
            className='locations__item'
          >
            <Link
              to={`?city=${city}`}
              className={classNames(
                'locations__item-link',
                'tabs__item',
                {'tabs__item--active' : activeCity === city}
              )}
              onClick={() =>onCityClick(city)}
            >
              <span>{city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Locations;
