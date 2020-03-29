import React, { Component } from 'react'
import {
    Navbar,
    NavbarBrand,
    NavLink
} from "reactstrap";

export default class GSTNavbar extends Component<React.HTMLAttributes<HTMLDivElement>> {

    render() {
        return (
            <div>
                <Navbar
                    color="light"
                    expand="md"
                >
                    <NavbarBrand>
                        <strong>
                            GST<span role="img" aria-label="shit">💩</span>
                        </strong>
                    </NavbarBrand>
                    <NavLink href="/"> Counters </NavLink>
                    <NavLink href="/create"> New Geed </NavLink>
                </Navbar>
            </div>
        )
    }
}
