import React from "react";
import { Card, Segment, Button } from "semantic-ui-react";

export default function ClassCard({ classObj, handleSelect, isSelected }) {
  return (
    <Card key={classObj._id}>
      <Card.Content textAlign="left">
        <Card.Header floated="left">{classObj.name}</Card.Header>
        <Button
          onClick={() => {
            handleSelect(classObj._id);
          }}
          toggle
          active={isSelected}
        >
          <h2>{isSelected ? "Selected" : "Select"}</h2>
        </Button>
      </Card.Content>
      <Card.Content extra textAlign={"left"}>
        <Segment>
          <Card.Description>
            <h3>Given Proficiencies:</h3>
            <ul>
              {classObj.proficiencies.map((proficiency) => {
                return <li>{proficiency.name}</li>;
              })}
            </ul>
          </Card.Description>
        </Segment>
        <Segment>
          <Card.Description>
            <h3>
              Select {classObj.proficiency_choices[0].choose} of the Following
              Proficiencies:
            </h3>
            <ul>
              {classObj.proficiency_choices[0].from.map((profChoice) => {
                return <li>{profChoice.name}</li>;
              })}
            </ul>
          </Card.Description>
        </Segment>
        <Segment>
          <Card.Description>
            <h3>Starting Equipment:</h3>
            <ul>
              {classObj.starting_equipment.map((equipment) => {
                return (
                  <li>
                    {equipment.equipment.name}, Quantity: {equipment.quantity}
                  </li>
                );
              })}
            </ul>
          </Card.Description>
        </Segment>
        <Segment>
          <Card.Description>
            <h3>Additional Equipment Selections:</h3>
            <ul>
              {classObj.starting_equipment_options.map((equipmentOption) => {
                return (
                  <li>
                    Choose {equipmentOption.choose} of:
                    <ul>
                      {equipmentOption.from.map((choice) => {
                        if (choice.equipment) {
                          return <li>{choice.equipment.name}</li>;
                        } else if (choice.equipment_option) {
                          return (
                            <li>
                              Equipment from{" "}
                              {
                                choice.equipment_option.from.equipment_category
                                  .name
                              }
                            </li>
                          );
                        } else if (choice.equipment_category) {
                          return <li>{choice.equipment_category.name}</li>;
                        }
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </Card.Description>
        </Segment>
        <Segment>
          <Card.Description>
            <h3>Subclasses</h3>
            <ul>
              <li>{classObj.subclasses[0].name}</li>
            </ul>
          </Card.Description>
        </Segment>
      </Card.Content>
    </Card>
  );
}
