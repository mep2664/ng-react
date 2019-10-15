import * as React from "react";
import { TextInput } from "../..";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const CREATE_SPRINT = gql`
    mutation CREATE_SPRINT($sprintName:String!, $goal:String, $dateStart:DateTime, $dateEnd:DateTime) {
        createSprint(sprintName:$sprintName, goal:$goal, dateStart:$dateStart, dateEnd:$dateEnd){
            sprint {
                sprintId
                sprintName
                goal
                dateStart
                dateEnd
            }
        }
    }
`;

export const CreateSprint: React.FC = () => {
    const [sprintName, setSprintName] = React.useState<string>("");
    const [goal, setGoal] = React.useState<string>("");
    const [dateStart, setDateStart] = React.useState<string>("");
    const [dateEnd, setDateEnd] = React.useState<string>("");
    const [createSprint] = useMutation(CREATE_SPRINT);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            sprintName,
            goal,
            dateStart: new Date(dateStart).toISOString(),
            dateEnd: new Date(dateEnd).toISOString(),
        }
        createSprint({ variables: data });

    }

    return (
        <div>
            {`Create Sprint...`}
            <form action="localhost:5556/sprint" method="post" onSubmit={handleSubmit}>
                <TextInput label="Sprint Name" name="sprintName" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSprintName(e.target.value)} />
                <TextInput label="Goal" name="goal" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoal(e.target.value)} />
                <input type="date" name="dateStart" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateStart(e.target.value)} />
                <input type="date" name="dateEnd" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateEnd(e.target.value)} />
                <input type="submit" value="submit" />
            </form>
        </div>
    );
}