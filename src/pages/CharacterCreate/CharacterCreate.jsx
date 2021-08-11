import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
  Redirect,
} from "react-router-dom";
import charService from "../../utils/charService";
import raceService from "../../utils/raceService";
import classService from "../../utils/classService";
import { Button, Form, Grid, Segment, Loader } from "semantic-ui-react";
import PageHeader from "../../components/PageHeader/PageHeader";
import CharacterName from "../../components/CharacterCreateSteps/CharacterName/CharacterName";
import RaceSelect from "../../components/CharacterCreateSteps/RaceSelect/RaceSelect";
import ClassSelect from "../../components/CharacterCreateSteps/ClassSelect/ClassSelect";
import AbilityScoresSelect from "../../components/CharacterCreateSteps/AbilityScores/AbilityScoresSelect";
import CharacterBio from "../../components/CharacterCreateSteps/CharacterBio/CharacterBio";

export default function CharacterCreate({ user, handleLogout }) {
  // state management
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [races, setRaces] = useState([]);
  const [state, setState] = useState({
    name: "Test",
    race: "",
    class: "",
    strength: "",
    dexterity: "",
    constitution: "",
    intelligence: "",
    wisdom: "",
    charisma: "",
    charBio: "This is a test bio",
    photoUrl: "",
  });
  const history = useHistory();
  let { path, url } = useRouteMatch();

  // functions
  function handleFileInput(e) {
    setSelectedFile(e.target.files[0]);
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", selectedFile);
    for (let key in state) {
      formData.append(key, state[key]);
    }
    try {
      const data = await charService.create(formData);
      history.push("/");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }

  async function getRaces() {
    try {
      const data = await raceService.getAll();
      setRaces([...data.races]);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.log(error);
    }
  }

  async function getClasses() {
    try {
      const data = await classService.getAll();
      setClasses([...data.classes]);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.log(error);
    }
  }

  function isLoading() {
    if (classes.length && races.length) {
      return false;
    } else {
      return true;
    }
  }

  // useEffect to populate Class and Race information for ability scores and proficiency options
  useEffect(() => {
    getRaces();
    getClasses();
  }, []);

  if (isLoading()) {
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
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Row>
        <Grid.Column>
          <PageHeader user={user} handleLogout={handleLogout} />
        </Grid.Column>
      </Grid.Row>
      <Grid textAlign="center" verticalAlign="middle" style={{ width: "80vw" }}>
        <Grid.Row>
          <h2>Create Your Character</h2>
          <ul id="NavList">
            <li>
              <Link to={`${url}/race`}>Select Character Race</Link>
            </li>
            <li>
              <Link to={`${url}/class`}>Select Character Class</Link>
            </li>
            <li>
              <Link to={`${url}/ability`}>Assign Character Ability Scores</Link>
            </li>
            <li>
              <Link to={`${url}/bio`}>Character Bio</Link>
            </li>
          </ul>
        </Grid.Row>
        <Segment>
          <CharacterName state={state} handleChange={handleChange} />
        </Segment>
      </Grid>
      <Grid.Row />
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${path}/race`} />
        </Route>
        <Route path={`${path}/race`}>
          <RaceSelect state={state} setState={setState} races={races} />
        </Route>
        <Route path={`${path}/class`}>
          <ClassSelect state={state} setState={setState} classes={classes} />
        </Route>
        <Route path={`${path}/ability`}>
          <AbilityScoresSelect state={state} setState={setState} />
        </Route>
        <Route path={`${path}/bio`}>
          <CharacterBio state={state} handleChange={handleChange} />
        </Route>
      </Switch>
      <Grid.Row />
      <Grid.Column style={{ width: "80vw" }}>
        <Segment stacked>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Form.Input
              className="form-control"
              type="file"
              name="photo"
              placeholder="upload image"
              onChange={handleFileInput}
            />
            <Button type="submit" className="btn">
              ADD Character
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
