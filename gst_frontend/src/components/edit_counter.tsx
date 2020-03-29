import React, { Component } from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import {
    FormGroup,
    Button
} from 'reactstrap'

// we need to do this so we can access match.params.id from props
interface MatchParams { id: string }
interface Props extends RouteComponentProps<MatchParams> { /*none*/ }

interface State {
    username: string
}

export default class EditCounter extends Component<Props, State> {
    state = {
        username: ""
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/counters/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username
                })
            })
    }

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

        axios.post('http://localhost:5000/counters/update/' + this.props.match.params.id, counter)
            .then(res => {
                console.log(res.data);
                //reset username
                this.setState({
                    username: ""
                });
                window.location.href = "/";
            })
            .catch(err => {
                alert(err.response.data.message);
                //reset username
                this.setState({
                    username: ""
                });
            });
    }

    render() {
        return (
            <div>
                <h3>Edit Counter!</h3>
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
                        Edit!
                    </Button>
                </form>
            </div>
        )
    }
}
