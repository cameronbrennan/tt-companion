import React from "react";
import { Form, Grid, Segment } from "semantic-ui-react";

export default function AbilityScoresSelect({ state, setState }) {
  const fifthEditionScores = [15, 14, 13, 12, 10, 8];

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      //setScores = scores-e.target.value
      //.filter()
    });
  }

  return (
    <Grid.Row>
      <Grid.Column style={{ width: "40vw" }}>
        <Segment stacked>
          <h3>Ability Scores</h3>
          <p>Values MUST be between 3 and 18</p>
          <Form.Field
            className="form-control"
            name="strength"
            label="Strength: "
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
            label="Dexterity: "
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
            label="Constitution: "
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
            label="Intelligence: "
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
            label="Wisdom: "
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
            label="Charisma: "
            control="input"
            type="number"
            min={3}
            max={18}
            value={state.charisma}
            onChange={handleChange}
            required
          />
        </Segment>
      </Grid.Column>
      <Grid.Column textAlign="left" style={{ width: "40vw" }}>
        <Grid.Row>
          <Segment>
            <h4>Dungeons and Dragons Fifth Edition Default Score Values: </h4>
            <ul>
              {fifthEditionScores.map((score) => {
                return <li key={score}>{score}</li>;
              })}
            </ul>
          </Segment>
        </Grid.Row>
        <Segment>
          <Grid.Row>
            <p>
              If you choose not to use these default values and would like to
              roll your own, roll 4 x Six-Sided Die, and drop the lowest roll
              value.
              <br />
              <br />
              Repeat this process 6 times to get your Ability Score Values!
            </p>
          </Grid.Row>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  );
}
