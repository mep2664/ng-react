import React from 'react';
import './App.css';
import { Dashboard, PageHeader, Ticket, Tooltip } from "./components";
import { Route, BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
    //const [tooltip, setTooltip] = React.useState(<React.Fragment></React.Fragment>);
    //const button = React.useRef<HTMLButtonElement>(null);

    // const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     if (button.current) {
    //         setTooltip(
    //             <Tooltip
    //                 Caption="Tooltip!"
    //                 AnchorElement={e.target as HTMLButtonElement}
    //                 Position="Top"
    //             />
    //         );
    //     }
    // }

    const dashboard = () => {
        console.log("dashboard");
        return <Dashboard />;
    }

    function ticket({ match }: { match: any }) {
        console.log(match.params)
        console.log("ticket");
        return <Ticket {...match.params} />;
    }

    return (
        <React.Fragment>
            <BrowserRouter>
                <PageHeader />
                <main>
                    <Route path="/" exact component={dashboard} />
                    <Route path="/ticket/:project-:ticketId" component={ticket} />
                </main>
                {/*tooltip*/}
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
