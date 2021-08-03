import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import userService from "../../utils/userService";
import { useHistory } from "react-router-dom";

export default function SignUpPage(props) {
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [state, setState] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    passwordConf: "",
    bio: "",
  });
  const history = useHistory();

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
      await userService.signup(formData);
      props.handleSignUpOrLogin();
      history.push("/");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }

  function handleFileInput(e) {
    setSelectedFile(e.target.files[0]);
  }

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="https://i.imgur.com/n8LKPIO.png" /> Sign Up
          </Header>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                name="username"
                placeholder="Username"
                value={state.username}
                onChange={handleChange}
                required
              />
              <Form.Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={state.email}
                onChange={handleChange}
                required
              />
              <Form.Input
                name="firstname"
                placeholder="First Name"
                value={state.firstname}
                onChange={handleChange}
                required
              />
              <Form.Input
                name="lastname"
                placeholder="Last Name"
                value={state.lastname}
                onChange={handleChange}
                required
              />
              <Form.Input
                name="password"
                type="password"
                placeholder="Password"
                value={state.password}
                onChange={handleChange}
                required
              />
              <Form.Input
                name="passwordConf"
                type="password"
                placeholder="Confirm Password"
                value={state.passwordConf}
                onChange={handleChange}
                required
              />
              <Form.TextArea
                label="Tell Us About Yourself"
                placeholder="About..."
                name="bio"
                value={state.bio}
                onChange={handleChange}
              />
              <Form.Field>
                <Form.Input
                  label="Add your Profile Picture"
                  type="file"
                  name="photo"
                  placeholder="upload image"
                  onChange={handleFileInput}
                  required
                />
              </Form.Field>
              <Button type="submit" className="btn">
                Signup
              </Button>
            </Segment>
            {error ? <ErrorMessage error={error} /> : null}
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
}
