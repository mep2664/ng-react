import * as React from "react";
import { NotFound } from "../../";
import { ViewProject, ViewSprint, ViewTeam, ViewTicket, ViewUser } from "../"

interface IViewItem {
    item: string;
    identifier: string;
}

export const ViewItem: React.FC<IViewItem> = ({ item, identifier }) => {
    switch (item) {
        case "project":
            return <ViewProject projectName={identifier} />;
        case "sprint_project":
            return <ViewSprint sprintProjectId={identifier} />;
        case "team":
            return <ViewTeam team={identifier} />;
        case "ticket":
            const ids = identifier.split("-");
            if (ids.length === 2) {
                return <ViewTicket project={ids[0]} ticket={parseInt(ids[1])} />;
            }
        case "user":
            return <ViewUser userId={identifier} />
        default:
            return <NotFound />;
    }
}