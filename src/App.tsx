import React from 'react';
import './App.css';
import { CreateItem, Dashboard, ITicket, Login, ModuleAside, NotFound, PageHeader, Ticket } from "./components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
    uri: "http://localhost:5556/graphql",
})

// maybe make this a section?
const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
`;

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
        return <Dashboard />;
    }

    const login = () => {
        return <Login />;
    }

    const create = () => {
        return <CreateItem />;
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
        <ApolloProvider client={client}>
            <BrowserRouter>
                <PageHeader />
                <ContentWrapper>
                    <ModuleAside />
                    <main>
                        <Switch>
                            <Route path="/" exact component={dashboard} />
                            <Route path="/login" component={login} />
                            <Route path="/create" component={create} />
                            <Route path="/ticket/:project-:ticketId" component={ticket} />
                            <Route path="/page-not-found" component={notFound} />
                            <Route default component={notFound} />
                        </Switch>
                    </main>
                </ContentWrapper>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
