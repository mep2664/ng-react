import * as React from "react";
import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
    return (
        <div>
            Page Not Found. Would you like to go to the <Link to="/">dashboard?</Link>
        </div>
    );
}