import React, { Component } from 'react'
import axios from "axios";
import {
    FormGroup,
    Button
} from 'reactstrap'

interface State {
    username: string
}

export default class CreateCounter extends Component<State> {
    state = {
        username: ""
    };

    onChangeUsername = (e: any) => {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit = (e: any) => {
        e.preventDefault();

        const counter = {
            username: this.state.username,
            count: 0
        }

        console.log(counter);

        axios.post('http://54.218.71.105/counters/add', counter)
            .then(res => {
                console.log(res.data);
                //reset username
                this.setState({
                    username: ""
                });
                window.location.href = "/";
            })
            .catch(err => {
                if (err.message === "Network Error"){
                    alert('Server probably isn\'t on \n' + err);
                } else{
                    alert(err.response.data.message)
                }
                //reset username
                this.setState({
                    username: ""
                });
            });
    }

    render() {
        return (
            <div>
                <h3>Create New Counter!</h3>
                <form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <label>Username: </label>
                        {' '}
                        <input
                            type="text"
                            required
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </FormGroup>
                    <Button
                        type="submit"
                    >
                        geeed
                    </Button>
                </form>
            </div>
        )
    }
}
