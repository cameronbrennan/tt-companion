import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon } from "semantic-ui-react";

export default function PageHeader({ user, handleLogout }) {
  return (
    <Segment clearing>
      <Header as="h2" floated="right">
        <Link to="/">
          <Icon name="home"></Icon>
        </Link>
        <Link to="/characters">
          <Icon name="child" title="All Characters"></Icon>
        </Link>
        <Link to="/create">
          <Icon name="edit icon" title="Create Character"></Icon>
        </Link>
        <Link to={`/${user.username}`}>
          <Icon name="bug" title="My Characters"></Icon>
        </Link>
        <Link to="" onClick={handleLogout}>
          <Icon name="sign in" title="Logout"></Icon>
        </Link>
      </Header>
      <Header as="h2" floated="left">
        <Link to={`/${user.username}`}>
          <Image
            src={
              user.photoUrl ? user.photoUrl : "https://i.imgur.com/n8LKPIO.png"
            }
            avatar
          ></Image>
          <Icon name="address book outline"></Icon>
        </Link>
      </Header>
    </Segment>
  );
}
