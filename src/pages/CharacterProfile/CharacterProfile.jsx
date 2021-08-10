import React, { useState, useEffect } from "react";
import { Grid, Loader } from "semantic-ui-react";
import charService from "../../utils/charService";
import PageHeader from "../../components/PageHeader/PageHeader";
import CharacterDetail from "../../components/CharacterDetail/CharacterDetail";
import { useParams } from "react-router-dom";

export default function CharacterProfile({ user, handleLogout }) {
  console.log("this is hitting the character profile page");
  const [detailChar, setDetailChar] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams();

  async function getProfile() {
    try {
      const data = await charService.getOne(id);
      setDetailChar(data.character);
      setLoading(false);
      console.log("This is the data.character ->", data.character);
    } catch (err) {
      console.log(err);
      setError("Profile does not Exist");
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  if (error) {
    return (
      <>
        <PageHeader user={user} />
        <h1>{error}</h1>
      </>
    );
  }

  if (loading) {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ width: '80vw' }}>
          <Loader size="large" active>
            Loading...
          </Loader>
        </Grid.Column>
      </Grid>
    );
  }

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <PageHeader user={user} handleLogout={handleLogout} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <CharacterDetail character={detailChar} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
