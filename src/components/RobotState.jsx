import React, { Component } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import config from "../scripts/config";

class RobotState extends Component {
    state = {
        x: 0,
        y: 0,
        orientation: 0,
        linear_velocity: 0,
        angular_velocity: 0,
    };

    componentDidMount() {
        const { ros } = this.props;
        if (ros) {
            this.getRobotState(ros);
        }
    }

    getRobotState(ros) {
        console.log("Getting robot pose...");

        // create pose subscriber
        var pose_subscriber = new window.ROSLIB.Topic({
            ros: ros,
            name: config.topicRobotPose,
            messageType: config.messageTypePose,
        });

        // create a pose callback
        pose_subscriber.subscribe((message) => {
            this.setState({
                x: message.pose.pose.position.x.toFixed(2),
                y: message.pose.pose.position.y.toFixed(2),
            });
        });
    }

    render() {
        const { ros } = this.props;
        return (
            <div>
                {ros && (
                    <>
                        <h4>RobotState</h4>
                        <Row>
                            <Col>
                                <h5 className="mt-4">Position</h5>
                                <p className="mt-0">X: {this.state.x}</p>
                                <p className="mt-0">Y: {this.state.y}</p>
                                <p className="mt-0">Orientation: {this.state.orientation}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h5 className="mt-4">Velocities</h5>
                                <p className="mt-0">Linear Velocity: {this.state.linear_velocity}</p>
                                <p className="mt-0">Angular Velocity: {this.state.angular_velocity}</p>
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        );
    }
}

export default RobotState;