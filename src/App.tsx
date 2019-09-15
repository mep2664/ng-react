import React from 'react';
import './App.css';
import { Dashboard, ITicket, NotFound, PageHeader, Ticket } from "./components";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

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

    function notFound() {
        return <NotFound />
    }

    const dashboard = () => {
        console.log("dashboard");
        return <Dashboard />;
    }

    function ticket({ match }: { match: any }) {
        match.params.ticketId = parseInt(match.params.ticketId);
        const params: ITicket = match.params;
        if (params.ticketId) {
            return <Ticket {...params} />;
        }
        return <NotFound />;
    }

    return (
        <React.Fragment>
            <BrowserRouter>
                <PageHeader />
                <main>
                    <Switch>
                        <Route path="/" exact component={dashboard} />
                        <Route path="/ticket/:project-:ticketId" component={ticket} />
                        <Route path="/page-not-found" component={notFound} />
                        <Route default component={notFound} />
                    </Switch>
                </main>
                {/*tooltip*/}
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;
