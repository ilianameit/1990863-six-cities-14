import { Link } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { AppRoutes } from '../../components/const';
import { Helmet } from 'react-helmet-async';

function NotFoundScreen(): JSX.Element {
  return(
    <div className='page--gray container' style={{paddingTop: '50px'}}>
      <Helmet>
        <title>Can not found: 404</title>
      </Helmet>
      <Logo/>

      <section className="game__screen" style={{paddingTop: '20px'}}>
        <h1>404. Page not found</h1>
        <br/>
        <Link to={AppRoutes.Main}>Вернуться на главную</Link>
      </section>
    </div>
  );
}

export default NotFoundScreen;
