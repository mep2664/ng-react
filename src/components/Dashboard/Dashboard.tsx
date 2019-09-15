import * as React from "react";
import { Link } from "react-router-dom";

export const Dashboard: React.FC = () => {
    return (
        <div>
            dashboard
            <Link to="/ticket/PROJECT-1">NEWGIRRA-1</Link>
        </div>
    );
}