import { Link } from 'react-router-dom';
import { CityName } from '../../const/const';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks';

function Locations(): JSX.Element {
  const activeCity = useAppSelector((state) => state.activeCity);
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
