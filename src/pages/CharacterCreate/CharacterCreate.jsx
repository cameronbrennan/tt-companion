import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import charService from "../../utils/charService";
import raceService from "../../utils/raceService";
import classService from "../../utils/classService";
import { Button, Form, Grid, Segment, Loader } from "semantic-ui-react";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function CharacterCreate({ user, handleLogout }) {
  // state management
  const [error, setError] = useState("");
  const [char, setChar] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [races, setRaces] = useState([]);
  const [state, setState] = useState({
    name: "Test",
    race: "",
    class: "",
    strength: 12,
    dexterity: 12,
    constitution: 12,
    intelligence: 12,
    wisdom: 12,
    charisma: 12,
    charBio: "This is a test bio",
    photoUrl: "",
  });

  const history = useHistory();

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
      setChar(data);
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

  function isLoading(){
      if(classes.length && races.length){
          return false
      } else {
          return true
      }
  }

//   function getLoadingStatus() {
//     if (classes.length && races.length) {
//       setLoading(false);
//     }
//   }

  // useEffect to populate Class and Race information for ability scores and proficiency options
  useEffect(() => {
    getRaces();
    getClasses();
  }, []);

  if(isLoading()) {
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
              <label for="race">Select Your Character's Race</label>
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
              <label for="class">Select Your Character's Class</label>
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
