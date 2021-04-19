import Container from '../../components/Container';
import './ErrorPage.scss';
const ErrorPage = () => {
  return (
    <Container>
      <div className="ErrorPage">
        <h1 className="ErrorPage-title">404</h1>
        <p className="ErrorPage-text">Page not found</p>
      </div>
    </Container>
  );
};

export default ErrorPage;
