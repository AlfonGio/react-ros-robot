import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
    state = { };
    render() {
        return (
            <Container className="text-center">
                <p>SMU Robotics Lab &copy; 2023</p>
            </Container>
        );
    }
}

export default Footer;