import "./HomePage.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Card,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Alert,
} from "react-bootstrap";
import { useState, useEffect } from "react";

function HomePage() {
  const location = useLocation();
  const message = location.state?.message;

  const [showAlert, setShowAlert] = useState(!!message);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      <div className="home">
        {showAlert && message && (
          <Alert
            variant="success"
            className="mt-3"
            dismissable
            onClose={() => setShowAlert(false)}
          >
            {message}
          </Alert>
        )}
        <Card className="blurb-card">
          <Card.Body className="blurb-card__body">
            <Card.Title className="home__page-header">FunStats</Card.Title>
            <Card.Subtitle className="mb-2 text-muted home__subheader">
              Goals, Stats and Friendly Rivalries!
            </Card.Subtitle>
            <Card.Text className="home__body">
              Track your stats, challenge your friends and earn points that can
              be redeemed for rewards
            </Card.Text>
            <ButtonToolbar className="blurb-card__button-group">
              <Button className="home__button" href="/sign_up">
                Sign up
              </Button>
              <Button className="home__button" href="/sign_in">
                Log in
              </Button>
            </ButtonToolbar>
          </Card.Body>
        </Card>
        <Card className="image-card">
          <Card.Img
            variant="top"
            src="https://funstats-images.beretesting.com/hero.jpg"
            alt="kids around a soccer ball"
            className="image-card__image"
          />
        </Card>
      </div>
    </>
  );
}

export default HomePage;
