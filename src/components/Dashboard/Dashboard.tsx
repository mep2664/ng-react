import * as React from "react";
import { Link } from "react-router-dom";

export const Dashboard: React.FC = () => {
    return (
        <div>
            dashboard
            <Link to="/ticket/projectName-ticketID">NEWGIRRA-1</Link>
        </div>
    );
}