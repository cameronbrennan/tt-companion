import React from "react";
import { Form, Grid } from "semantic-ui-react";

export default function CharacterName({ state, handleChange }) {
  return (
    <Grid.Row>
      <Grid.Column style={{ width: "40vw" }}>
        <Form.Field
          label="Character Name"
          placeholder="Character Name"
          className="form-control"
          name="name"
          control="input"
          value={state.name}
          onChange={handleChange}
          required
        />
      </Grid.Column>
    </Grid.Row>
  );
}
