import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Segment, Image, Icon } from 'semantic-ui-react';


export default function PageHeader({user, handleLogout}){
    return (
        <Segment clearing>
            <Header as='h2' floated='right'>
                <Link to="/"><Icon name='home'></Icon></Link>
                <Link to="/">All Characters</Link>
                <Link to="/">My Characters</Link>
                <Link to='' onClick={handleLogout}>Logout</Link>
            </Header>
            <Header as='h2' floated='left'>
                <Link to={`/${user.username}`}><Image src={user.photoUrl ? user.photoUrl : "https://i.imgur.com/n8LKPIO.png"} avatar></Image>My Profile</Link>          
            </Header>
        </Segment>
    )
}