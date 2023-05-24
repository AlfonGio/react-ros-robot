import React, { Component } from "react";
import { Alert, Row, Col } from "react-bootstrap";
import config from "../scripts/config";
import Teleoperation from "./Teleoperation";
import RobotState from "./RobotState";
import Map from "./Map";

class Connection extends Component {
    state = {
        connecting: false,
        connected: false,
        ros: null,
    };

    componentDidMount() {
        this.init_connection();
    }

    init_connection() {
        const { connected, connecting } = this.state;
        if (connected || connecting) {
            return; // already connected or connecting
        }

        this.setState({ connecting: true });

        const ros = new window.ROSLIB.Ros();
        console.log(ros);

        ros.on("connection", () => {
            console.log("Connection established!");
            this.setState({ connected: true, connecting: false });
        });

        ros.on("close", () => {
            console.log("Connection is closed!");
            this.setState({ connected: false, connecting: false });
            this.reconnect();
        });

        ros.on("error", (error) => {
            console.log("Connection problem: ", error);
            this.setState({ connected: false, connecting: false });
            this.reconnect();
        });

        try {
            ros.connect(config.websocketURL);
            this.setState({ ros });
        } catch (error) {
            console.log("Connection problem: ", error);
            this.setState({ connecting: false });
        }
    }

    reconnect() {
        setTimeout(() => {
            this.init_connection();
        }, config.reconnectDelay);
    }

    render() {
        const { connected, connecting, ros } = this.state;
        return (
            <div>
                <Alert className="text-center m-3"
                    variant={connected ? "success" : "danger"}>
                    {connecting ? "Connecting..." : (connected ? "Robot Connected" : "Robot Disconnected")}
                </Alert>
                <Row>
                    <Col>
                        <Teleoperation ros={ros} />
                    </Col>
                    <Col>
                        <h4>Map</h4>
                        <Map ros={ros} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <RobotState ros={ros} />
                    </Col>
                </Row>
            </div >
        );
    }
}

export default Connection;