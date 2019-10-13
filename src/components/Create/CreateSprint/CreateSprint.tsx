import * as React from "react";
import { Loader, SelectInput, TextInput } from "../..";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

const GET_OPTIONS = gql`
query {
    allProjects {
        projectName
    }
}
`;

const CREATE_SPRINT = gql`
    mutation CREATE_SPRINT($sprintName:String!, $projectName:String, $goal:String, $dateStart:DateTime, $dateEnd:DateTime) {
        createSprint(sprintName:$sprintName, projectName:$projectName, goal:$goal, dateStart:$dateStart, dateEnd:$dateEnd){
            sprint {
                sprintId
                sprintName
                projectName
                goal
                dateStart
                dateEnd
            }
        }
    }
`;

export const CreateSprint: React.FC = () => {
    const [sprintName, setSprintName] = React.useState<string>("");
    const [projectName, setProjectName] = React.useState<string>("");
    const [goal, setGoal] = React.useState<string>("");
    const [dateStart, setDateStart] = React.useState<string>("");
    const [dateEnd, setDateEnd] = React.useState<string>("");
    const { loading, error, data } = useQuery(GET_OPTIONS);
    const [createSprint] = useMutation(CREATE_SPRINT);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            sprintName,
            projectName,
            goal,
            dateStart: new Date(dateStart).toISOString(),
            dateEnd: new Date(dateEnd).toISOString(),
        }
        console.log(data);
        createSprint({ variables: data });

    }

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    const projectOptions = data.allProjects.map((project: any) => { return { caption: project.projectName, value: project.projectName } });

    return (
        <div>
            {`Create Sprint...`}
            <form action="localhost:5556/sprint" method="post" onSubmit={handleSubmit}>
                <TextInput label="Sprint Name" name="sprintName" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSprintName(e.target.value)} />
                <SelectInput label="Project" name="project" options={projectOptions} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProjectName(e.target.value)} />
                <TextInput label="Goal" name="goal" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoal(e.target.value)} />
                <input type="date" name="dateStart" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateStart(e.target.value)} />
                <input type="date" name="dateEnd" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateEnd(e.target.value)} />
                <input type="submit" value="submit" />
            </form>
        </div>
    );
}