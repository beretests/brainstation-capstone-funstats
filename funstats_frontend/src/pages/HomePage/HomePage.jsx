import heroImage from "./../../assets/images/hero.jpg";
import soccerField from "./../../assets/images/field1.jpg";
import "./HomePage.scss";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Alert,
} from "react-bootstrap";

function HomePage() {
  return (
    <>
      <div className="home">
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
            src={heroImage}
            alt="kids around a soccer ball"
            className="image-card__image"
          />
        </Card>
      </div>
    </>
  );
}

export default HomePage;
