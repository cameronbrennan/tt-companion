import React from "react";
import { Form, Grid, Segment } from "semantic-ui-react";

export default function CharacterBio({ state, handleChange }) {
  return (
    <Grid.Row>
      <Grid.Column style={{ width: "40vw" }}>
        <Segment>
          <Form.Field
            className="form-control"
            name="charBio"
            label="Character Bio: "
            control="textarea"
            value={state.charBio}
            onChange={handleChange}
            required
          />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  );
}
