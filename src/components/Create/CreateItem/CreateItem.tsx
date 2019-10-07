import * as React from "react";
import { NotFound } from "../..";
import { CreateTicket } from "../";

interface ICreateItem {
    item: string;
}

export const CreateItem: React.FC<ICreateItem> = ({ item }) => {
    switch (item) {
        case "ticket":
            return <CreateTicket />;
        default:
            return <NotFound />;
    }
}