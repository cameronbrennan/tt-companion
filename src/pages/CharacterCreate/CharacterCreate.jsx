import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import charService from "../../utils/charService";
import raceService from "../../utils/raceService";
import classService from "../../utils/classService";
import { Button, Form, Grid, Segment, Loader } from "semantic-ui-react";
import PageHeader from "../../components/PageHeader/PageHeader";
import RaceSelect from "../../components/CharacterCreateSteps/RaceSelect/RaceSelect";
import ClassSelect from "../../components/CharacterCreateSteps/ClassSelect/ClassSelect";
import AbilityScoresSelect from "../../components/CharacterCreateSteps/AbilityScores/AbilityScoresSelect";

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
      <div>
        <h2>Create Character</h2>
        <ul>
          <li>
            <Link to={`${url}/race`}>Select Character Race</Link>
          </li>
          <li>
            <Link to={`${url}/class`}>Select Character Class</Link>
          </li>
          <li>
            <Link to={`${url}/ability`}>Assign Character Ability Scores</Link>
          </li>
        </ul>
      </div>

      <Switch>
        <Route exact path={path}>
          <h2>Create Character</h2>
        </Route>
        <Route exact path={`${path}/race`}>
          <RaceSelect state={state} setState={setState} races={races} />
        </Route>
        <Route path={`${path}/class`}>
          <ClassSelect state={state} setState={setState} classes={classes} />
        </Route>
        <Route path={`${path}/ability`}>
          <AbilityScoresSelect state={state} setState={setState} />
        </Route>
      </Switch>

      <Grid.Column style={{ width: "80vw" }}>
        <Segment stacked>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Form.Field
              label="Enter your Character's Name"
              placeholder="Character Name"
              className="form-control"
              name="name"
              control="input"
              value={state.name}
              onChange={handleChange}
              required
            />
            <div>
              <label htmlFor="race">Select Your Character's Race</label>
              <select name="race" value={state.race} onChange={handleChange}>
                {races.map((race) => {
                  return (
                    <option key={race.index} value={race._id}>
                      {race.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="class">Select Your Character's Class</label>
              <select name="class" value={state.class} onChange={handleChange}>
                {classes.map((classObj) => {
                  return (
                    <option key={classObj.index} value={classObj._id}>
                      {classObj.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <Form.Field
              className="form-control"
              name="strength"
              label="Strength:"
              control="input"
              type="number"
              min={3}
              max={18}
              value={state.strength}
              onChange={handleChange}
              required
            />
            <Form.Field
              className="form-control"
              name="dexterity"
              label="Dexterity:"
              control="input"
              type="number"
              min={3}
              max={18}
              value={state.dexterity}
              onChange={handleChange}
              required
            />
            <Form.Field
              className="form-control"
              name="constitution"
              label="Constitution:"
              control="input"
              type="number"
              min={3}
              max={18}
              value={state.constitution}
              onChange={handleChange}
              required
            />
            <Form.Field
              className="form-control"
              name="intelligence"
              label="Intelligence:"
              control="input"
              type="number"
              min={3}
              max={18}
              value={state.intelligence}
              onChange={handleChange}
              required
            />
            <Form.Field
              className="form-control"
              name="wisdom"
              label="Wisdom:"
              control="input"
              type="number"
              min={3}
              max={18}
              value={state.wisdom}
              onChange={handleChange}
              required
            />
            <Form.Field
              className="form-control"
              name="charisma"
              label="Charisma:"
              control="input"
              type="number"
              min={3}
              max={18}
              value={state.charisma}
              onChange={handleChange}
              required
            />
            <Form.Field
              className="form-control"
              name="charBio"
              label="Character Bio:"
              control="input"
              value={state.charBio}
              onChange={handleChange}
              required
            />
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
