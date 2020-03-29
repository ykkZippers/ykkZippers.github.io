import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/gst_list.css'

import {
    Table,
    Button
} from 'reactstrap';

/* ************************* GSTListRow FC ************************* */
interface GST_LR_Props {
    counter: any,
    cb_add: Function,
    cb_sub: Function,
    cb_del: Function
}

export const GSTListRow: React.FC<GST_LR_Props> = ({
    counter,
    cb_add,
    cb_sub,
    cb_del
}) => (
        <tr>
            <td>{counter.username}</td>
            <td>
                <span>
                    {counter.count}
                    {' '}
                    <Button
                        color="primary"
                        onClick={() => cb_add(counter._id)}
                    >
                        +
                    </Button>
                    {' '}
                    <Button
                        color="danger"
                        onClick={() => cb_sub(counter._id)}
                    >
                        -
                </Button>
                </span>
            </td>
            <td>
                <span>
                    <Button
                        color="link"
                        onClick={() => cb_del(counter._id)}
                    >
                        delete
                    </Button>|
                    <Button color="link">
                        <Link to={"/edit/" + counter._id}>
                            edit
                        </Link>
                    </Button>
                </span>
            </td>
        </tr>
    );

/* **************************** GSTList **************************** */
interface Props { /*none*/ }
interface State {
    counters: Array<any>
}

export default class GSTList extends Component<Props, State> {
    state = {
        counters: []
    }

    componentDidMount = () => {
        
        console.log("before show list")
        axios.get('http://localhost:5000/counters/')
            .then(response => {
                this.setState({
                    counters: response.data
                });
                console.log("show list");
            })
            .catch(err => {
                if (err.message === 'Network Error'){
                    alert('Server probably isn\'t on \n' + err)
                } else {
                    alert(err);
                }
                console.log(err);
            });
    }

    deleteCounter = (id: String) => {
        axios.delete('http://localhost:5000/counters/' + id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    counters: this.state.counters.filter((el: any) => el._id !== id)
                })
            });
    }

    addCount = (id: String) => {
        axios.post('http://localhost:5000/counters/add/' + id)
            .then(res => {
                console.log(res.data);
                // update our state
                this.componentDidMount();
            });

    }

    subCount = (id: String) => {
        axios.post('http://localhost:5000/counters/subtract/' + id)
            .then(res => {
                console.log(res.data);

                console.log("test");
                // update our state
                this.componentDidMount();
            });
    }

    // for rendering our list of counters
    counterList = () => {
        return this.state.counters.map(counter_ => {
            return (
                <GSTListRow
                    counter={counter_}
                    cb_add={this.addCount}
                    cb_sub={this.subCount}
                    cb_del={this.deleteCounter}
                />
            );
        });
    }

    render() {

        return (
            <div>
                <h3>Current Offenders</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.counterList()}
                    </tbody>
                </Table>
            </div>
        )
    }
}
