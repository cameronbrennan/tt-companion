import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import charService from "../../utils/charService";
import raceService from "../../utils/raceService";
import classService from "../../utils/classService";
import { Button, Form, Grid, Segment, Loader } from "semantic-ui-react";

export default function AbilityScoresCard({ handleSubmit, handleChange }) {
  return (
    <>
      <Grid.Column style={{ width: "80vw" }}>
        <Segment stacked>
          <Form autoComplete="off" onSubmit={handleSubmit}></Form>
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
        </Segment>
      </Grid.Column>
    </>
  );
}
