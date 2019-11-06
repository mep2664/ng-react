import * as React from "react";
import { TextInput } from "../..";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export const CREATE_SPRINT = gql`
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
    const [dateStart, setDateStart] = React.useState<string>(new Date().toISOString());
    const [dateEnd, setDateEnd] = React.useState<string>(new Date().toISOString());
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
            <form action="localhost:5557/sprint" method="post" onSubmit={handleSubmit}>
                <TextInput label="Sprint Name" name="sprintName" value={sprintName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSprintName(e.target.value)} />
                <TextInput label="Goal" name="goal" value={goal} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoal(e.target.value)} />
                <label htmlFor="dateInput__dateStart">Date Start</label>
                <input id="dateInput__dateStart" type="date" name="dateStart" value={dateStart.split("T")[0]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateStart(e.target.value)} />
                <label htmlFor="dateInput__dateEnd">Date End</label>
                <input id="dateInput__dateEnd" type="date" name="dateEnd" value={dateEnd.split("T")[0]} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateEnd(e.target.value)} />
                <input type="submit" value="submit" />
            </form>
        </div>
    );
}