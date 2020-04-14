import React, { Component } from 'react'


const url = (a, b) => (`http://localhost:8080/sum?a=${a}&b=${b}`);

function afficher(user) {
    return (
        <div>
            {user.firstName + " " + user.lastName + " " + user.tel}
        </div>
    )
}

export class Home extends Component {
    state = {
        user : {
            firstName: '',
            lastName: '',
            tel: '',
        },
        users: [],
        res: '',
    };

    change = event => {
        let { name, value } = event.target;
        let { user } = this.state;
        user = {
            ...user,
            [name]: value,
        };
        this.setState({
            user,
        })
    }

    initUser = () => {
        let user = {
            firstName: '',
            lastName: '',
            tel: '',
        }
        this.setState({user});
    }

    addUser = () => {
        const { user } = this.state;
        console.log(user);
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }
        this.initUser();
        fetch('http://localhost:8080/user', options)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({
                users: res,
            })
        });
    }


    caluculate = () => {
        // calcul
        const { a, b } = this.state;
        fetch(`http://localhost:8080/sum?a=${a}&b=${b}`)
            .then(a => a.json())
            .then(
                (response) => {
                    console.log(response);
                    alert(response);
                    this.setState({ res: response });
                }
            )
    }

    render() {
        const { user, res, users } = this.state;
        return (
            <div>
                <h1>Home</h1>
                <br />
                <input name="firstName" value={user.firstName} onChange={this.change} />
                <br />
                <input name="lastName" value={user.lastName} onChange={this.change} />
                <br />
                <input name="tel" value={user.tel} onChange={this.change} />
                <br />
                <button onClick={this.addUser}>Add</button>
                <button onClick={this.caluculate}>Calculer</button>
                <hr />
                <h3>{res}</h3>
                <hr />
                <h2>Users</h2>
                {
                    users.map(user => afficher(user))
                }

            </div>
        )
    }
}

export default Home;
