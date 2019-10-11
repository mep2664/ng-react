import * as React from "react";
import { NotFound } from "../..";
import { CreateProject, CreateSprint, CreateTeam, CreateTicket } from "../";

interface ICreateItem {
    item: string;
}

export const CreateItem: React.FC<ICreateItem> = ({ item }) => {
    switch (item) {
        case "project":
            return <CreateProject />;
        case "sprint":
            return <CreateSprint />;
        case "team":
            return <CreateTeam />;
        case "ticket":
            return <CreateTicket />;
        default:
            return <NotFound />;
    }
}