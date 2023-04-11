/*
 * User.js
*/

import classes from "./style/User.module.css";

import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function User(props)
{
    const [name, setName] = useState("");
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        signIn();
        // signUp();
    }

    async function signUp() {
        await fetch(`http://localhost:3000/signUp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, password}),
        }).then(res => res.json());
    }

    async function signIn() {
        await fetch(`http://localhost:3000/signIn`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, password}),
        }).then(res => { 
            props.userHandler(name);
            res.json();
        });
    }

    // async function saveData() {
    //     await fetch(`http://localhost:3000/saveData`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({name, password}),
    //     }).then(res => { 
    //         props.userHandler(name);
    //         res.json();
    //     });
    // }

	return (
        <form onSubmit={handleSubmit}>
            <label> username:
                <input
                   value = {name} 
                   onChange = {(e) => setName(e.target.value)}
                />
            </label>
            <br/>
            <label> password:
                <input
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                />
            </label>
            <br/>
            <input type = "submit" />
        </form>
    );
}

export default User;
