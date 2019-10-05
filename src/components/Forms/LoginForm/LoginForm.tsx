import * as React from "react";

export const LoginForm: React.FC = () => {
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            username,
            password,
        }
        fetch("http://localhost:5556/login", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(data),
        }).then((response) => {
            console.log(response);
        }, (failure) => console.log(failure));
    }

    return (
        <form action="localhost:5556/login" method="post" onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="login" />
        </form>
    );
}