import React from 'react';
import './App.css';
import { CreateItem, Dashboard, Home, ITicket, Loaders, Login, ModuleAside, NotFound, PageHeader, ViewItem } from "./components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const getCookie = (cname: string) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const loginClient =
    new ApolloClient({
        uri: "http://localhost:5556/login",
    });

// maybe make this a section?
// const ContentWrapper = styled.div`
//     display: grid;
//     grid-template-columns: 1fr 3fr 1fr;
// `;

const Spaceholder = styled.div`
    height: 50px;
    background-color: white;
`;

const App: React.FC = () => {
    function home() {
        return <Home />
    }

    function notFound() {
        return <NotFound />
    }

    function dashboard() {
        return <Dashboard />;
    }

    function loaders() {
        return <Loaders />;
    }

    function login() {
        return <Login />;
    }

    function create({ match }: { match: any }) {
        return <CreateItem {...match.params} />;
    }

    function view({ match }: { match: any }) {
        return <ViewItem {...match.params} />;
    }


    // function ticket({ match }: { match: any }) {
    //     match.params.ticket = parseInt(match.params.ticket);
    //     const params: ITicket = match.params;
    //     if (params.ticket) {
    //         return <Ticket {...params} />;
    //     }
    //     return <NotFound />;
    // }

    const client = new ApolloClient({
        uri: "http://localhost:5556/graphql",
        headers: {
            AUTHTOKEN: getCookie("uuid"),
        },
    });

    if (getCookie("uuid")) {
        return (
            <ApolloProvider client={client}>
                <Spaceholder></Spaceholder>
                <BrowserRouter>
                    <main>
                        <Switch>
                            <Route path="/dashboard" component={dashboard} />
                            <Route path="/(|home)" component={home} />
                            <Route path="/login" component={login} />
                            <Route path="/create/:item" component={create} />
                            <Route path="/view/:item/:identifier?" component={view} />
                            <Route path="/page-not-found" component={notFound} />
                            <Route path="/loaders" component={loaders} />
                            <Route default component={notFound} />
                        </Switch>
                    </main>
                    <PageHeader />
                </BrowserRouter>
            </ApolloProvider>
        );
    }
    return (
        <ApolloProvider client={loginClient}>
            <Login />
        </ApolloProvider>
    );
}

export default App;
