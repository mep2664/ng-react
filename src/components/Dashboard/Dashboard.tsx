import * as React from "react";
import { Link } from "react-router-dom";

export const Dashboard: React.FC = () => {
    return (
        <div>
            dashboard
            <Link to={{ pathname: "/ticket", search: "?project=1&ticket=1" }}>NEWGIRRA-1</Link>
        </div>
    );
}