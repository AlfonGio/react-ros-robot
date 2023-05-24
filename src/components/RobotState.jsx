import React, { Component } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import config from "../scripts/config";
import * as Three from "three";

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
        console.log(ros);

        // create pose subscriber
        console.log("Getting robot pose...");
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
                orientation: this.getOrientationFromQuaternion(
                    message.pose.pose.orientation
                ).toFixed(2),
            });
        });

        // create velocity subscriber
        console.log("Getting robot velocity...");
        var velocity_subscriber = new window.ROSLIB.Topic({
            ros: ros,
            name: config.topicRobotVel,
            messageType: config.messageTypeVel,
        });

        // create velocity callback
        velocity_subscriber.subscribe((message) => {
            this.setState({
                linear_velocity: message.twist.twist.linear.x.toFixed(2),
                angular_velocity: message.twist.twist.angular.z.toFixed(2),
            });
        });
    }

    getOrientationFromQuaternion(ros_orientation_quaternion) {
        var q = new Three.Quaternion(
            ros_orientation_quaternion.x,
            ros_orientation_quaternion.y,
            ros_orientation_quaternion.z,
            ros_orientation_quaternion.w,
        );

        // convert quaternion into Roll, Pitch, and Yaw
        var RPY = new Three.Euler().setFromQuaternion(q);

        return RPY["_z"] * (180 / Math.PI);
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