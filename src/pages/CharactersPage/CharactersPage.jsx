import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import CharCard from "../../components/CharacterDetail/CharCard";
import * as charService from "../../utils/charService";
import { Button, Card, Grid, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function CharactersPage({ user, handleLogout }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCharacters() {
    try {
      const data = await charService.getAll();
      setCharacters([...data.characters]);
      setLoading(false);
    } catch (err) {
      console.log(err, "Failed to load characters FRONTEND");
    }
  }

  useEffect(() => {
    getCharacters();
  }, []);

  if (loading) {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ width: "80vw" }}>
          <Loader size="large" active>
            Loading...
          </Loader>
        </Grid.Column>
      </Grid>
    );
  }

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader handleLogout={handleLogout} user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ width: "80vw" }} verticalAlign="middle">
          <Button.Group size="big" style={{ width: "80vw" }}>
            <Button key="create">
              <Link to="/create">Create New Character</Link>
            </Button>
            <Button.Or />
            <Button key="profile">
              <Link to={user.username}>View My Characters</Link>
            </Button>
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
      <Card.Group itemsPerRow={3} stackable style={{ width: "90vw" }} centered>
        {characters.map((character) => {
          return <CharCard character={character} />;
        })}
      </Card.Group>
    </Grid>
  );
}
