import React from "react";
import { AppState } from "./store";
import { SystemActionTypes, SystemState } from "./store/System/types";
import { updateSession } from "./store/System/actions";
import { connect } from "react-redux";
import "./App.css";
import { CreateItem, Dashboard, Home, ITicket, Loaders, Login, ModuleAside, NotFound, PageHeader, ViewItem } from "./components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { bgColor } from './theme';

export const getCookie = (cname: string) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
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

const Spaceholder = styled.div`
    height: 50px;
    background-color: ${bgColor.Darkgray};
`;

const checkForActiveSession = (): Promise<SystemState> => {
    return new Promise<SystemState>((resolve, reject) => {
        const token = getCookie("uuid");
        if (token) {
            fetch(`http://localhost:5556/rest/login/${token}`,
                {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Accept": "application/json",
                    },
                    redirect: "follow",
                    referrer: "no-referrer",
                }
            ).then((response) => {
                console.log(response);
                response.json().then((session) => {
                    return resolve({
                        loggedIn: session.authenticated,
                        session: session.sessionID,
                        userName: session.userID,
                    })
                }, (reason) => reject(reason));
            }, (reason) => reject(reason));
        } else {
            return resolve({
                loggedIn: false,
                session: "",
                userName: "",
            });
        }
    });
};

const mapStateToProps = (state: AppState) => ({
    system: state.system,
});

const mapDispatchToProps = {
    updateSession: updateSession,
}

interface IAppProps {
    system: SystemState;
    updateSession: typeof updateSession;
}

const AppComponent: React.FC<IAppProps> = ({ system, updateSession }) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    console.log(system);
    React.useEffect(() => {
        checkForActiveSession().then((session) => {
            console.log(session);
            updateSession(session);
            setLoading(false);
        }, (reason) => { console.log(reason); setLoading(false); });
    }, []);

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

    const client = new ApolloClient({
        uri: "http://localhost:5556/graphql",
        headers: {
            AUTHTOKEN: getCookie("uuid"),
        },
    });

    if (loading) {
        return <div></div>;
    }

    if (system.loggedIn) {
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
        <React.Fragment>
            <Home />
            <PageHeader />
        </React.Fragment>
    );
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

export default App;
