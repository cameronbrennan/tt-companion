import React from "react";
import {Card, Segment} from 'semantic-ui-react';

export default function CharCard({character}){



    return(
        <Card key={character._id}>
            <Card.Content textAlign='left'>
                <Card.Header floated="right">Created By: {character.user.name}</Card.Header>
            </Card.Content>
            <Card.Content>

            </Card.Content>
        </Card>
    )

}