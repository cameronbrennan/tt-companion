import React, { useState, useEffect } from "react";
import { Grid, Loader, Card } from "semantic-ui-react";
import userService from "../../utils/userService";
import charService from "../../utils/charService";
import PageHeader from "../../components/PageHeader/PageHeader";
import UserBio from "../../components/UserBio/UserBio";
import CharCard from "../../components/CharacterDetail/CharCard";
import { useParams } from "react-router-dom";

export default function UserProfile({ user, handleLogout }) {
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState("");

  const { username } = useParams();

  async function getProfile() {
    try {
      const data = await userService.getProfile(username);
      setLoading(() => false);
      setProfileUser(() => data.user);
    } catch (err) {
      console.log(err);
      setError("Profile does not Exist");
    }
  }

  async function getUserCharacters() {
    try {
      const data = await charService.getAll();
      setCharacters([...data.characters]);
      setLoading(false);
    } catch (err) {
      console.log(err, "Failed to load profile characters");
    }
  }

  useEffect(() => {
    getProfile();
    getUserCharacters();
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
        <Grid.Column style={{ maxWidth: 450 }}>
          <Loader size="large" active>
            Loading
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
            <UserBio user={profileUser} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Card.Group
            itemsPerRow={3}
            stackable
            style={{ width: "90vw" }}
            centered
          >
            {characters.map((character) => {
              if (character.user._id === user._id) {
                return <CharCard character={character} />;
              }
            })}
          </Card.Group>
        </Grid.Row>
      </Grid>
    </>
  );
}
