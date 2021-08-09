import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import * as charService from "../../utils/charService";
import { Grid, Loader } from "semantic-ui-react";
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
        <Grid.Column style={{ maxWidth: 450 }}>
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
        <Grid.Column style={{ width: "80vw" }}>
          {characters.map((character) => {
            return <Link to={`/characters/${character._id}`} key={character._id}>{character.name}</Link>;
          })}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
