import React, { useState, useEffect } from "react";
import { Grid, Loader } from "semantic-ui-react";
import userService from "../../utils/userService";
import PageHeader from "../../components/PageHeader/PageHeader";
import UserBio from "../../components/UserBio/UserBio";
import { useParams } from "react-router-dom";

export default function UserProfile({ user, handleLogout}) {
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { username } = useParams();

  async function getProfile() {
    try {
      const data = await userService.getProfile(username);
      console.log(data, " data");
      setLoading(() => false);
      setProfileUser(() => data.user);
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
      </Grid>
    </>
  );
}
