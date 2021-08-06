import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import charService from "../../utils/charService";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function AddCharForm({ user, handleLogout }) {
  const [error, setError] = useState('')
  const [char, setChar] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [state, setState] = useState({
    name: "Tester's Character",
    race: "human",
    class: "wizard",
    strength: 12,
    dexterity: 12,
    constitution: 12,
    intelligence: 12,
    wisdom: 12,
    charisma: 12,
    charBio: "This is a test bio",
    photoUrl: "",
  });
  // const [raceValue, setRaceValue] = useState("")
  // const [classValue, setClassValue] = useState("")
  const history = useHistory();

  const races = [
    { key: "dragonborn", text: "Dragonborn", value: "dragonborn" },
    { key: "dwarf", text: "Dwarf", value: "dwarf" },
    { key: "elf", text: "Elf", value: "elf" },
    { key: "gnome", text: "Gnome", value: "gnome" },
    { key: "half-elf", text: "Half-Elf", value: "half-elf" },
    { key: "half-orc", text: "Half-Orc", value: "half-orc" },
    { key: "halfling", text: "Halfling", value: "halfling" },
    { key: "human", text: "Human", value: "human" },
    { key: "tiefling", text: "Tiefling", value: "tiefling" },
  ];

  const classes = [
    { key: "barbarian", text: "Barbarian", value: "barbarian" },
    { key: "bard", text: "Bard", value: "bard" },
    { key: "cleric", text: "Cleric", value: "cleric" },
    { key: "druid", text: "Druid", value: "druid" },
    { key: "fighter", text: "Fighter", value: "fighter" },
    { key: "monk", text: "Monk", value: "monk" },
    { key: "paladin", text: "Paladin", value: "paladin" },
    { key: "ranger", text: "Ranger", value: "ranger" },
    { key: "rogue", text: "Rogue", value: "rogue" },
    { key: "sorcerer", text: "Sorcerer", value: "sorcerer" },
    { key: "warlock", text: "Warlock", value: "warlock" },
    { key: "wizard", text: "Wizard", value: "wizard" },
  ];

  function handleFileInput(e) {
    setSelectedFile(e.target.files[0]);
  }

  function handleAbilityNum(e) {

    setState({
      ...state,
      
    })
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name);
    console.log(e.target.value);
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

  //   if (loading) {
  //     return (
  //       <Grid
  //         textAlign="center"
  //         style={{ height: "100vh" }}
  //         verticalAlign="middle"
  //       >
  //         <Grid.Column style={{ maxWidth: 450 }}>
  //           <Loader size="large" active>
  //             Loading...
  //           </Loader>
  //         </Grid.Column>
  //       </Grid>
  //     );
  // }

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
            {/* <Form.Field
              label="Enter your Character's Race"
              placeholder="Character Race"
              className="form-control"
              name="race"
              control="input"
              value={state.race}
              onChange={handleChange}
              required
            />
            <Form.Field
              label="Enter your Character's Class"
              placeholder="Character Class"
              className="form-control"
              name="class"
              control="input"
              value={state.class}
              onChange={handleChange}
              required
            /> */}
            <div>
              <label for="race">Select Your Character's Race</label>
              <select name="race" value={state.race} onChange={handleChange}>
                {races.map(race => {
                  return <option value={race.value}>{race.text}</option>
                })}
              </select>
            </div>
            <div>
              <label for="class">Select Your Character's Class</label>
              <select name="class" value={state.class} onChange={handleChange}>
                {classes.map(classObj => {
                  return <option value={classObj.value}>{classObj.text}</option>
                })}
              </select>
            </div>
            <Form.Select
              name="race"
              className="form-control"
              label="Select your Character's Race"
              placeholder="Race"
              options={races}
              value={state.race}
              onChange={handleChange}
              required
            />
            <Form.Select
              name="class"
              className="form-control"
              label="Select your Character's Class"
              placeholder="Class"
              options={classes}
              value={state.class}
              onChange={handleChange}
              required
            />
            <Form.Field
              className="form-control"
              name="strength"
              label="Strength:"
              control="input"
              type="number"
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
