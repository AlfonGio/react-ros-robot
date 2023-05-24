import React, { Component } from "react";
import { Joystick } from "react-joystick-component";
import config from "../scripts/config";

class Teleoperation extends Component {
    state = { };

    constructor(props) {
        super(props);
        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }

    handleMove(event) {
        console.log("Joystick move");
        const { ros } = this.props;

        // ROS publisher topic cmd_vel
        var cmd_vel = new window.ROSLIB.Topic({
            ros: ros,
            name: config.topicName,
            messageType: config.messageType,
        });

        // create twist message
        var twist = new window.ROSLIB.Message({
            linear: {
                x: event.y / 2,
                y: 0,
                z: 0,
            },
            angular: {
                x: 0,
                y: 0,
                z: -event.x / 2,
            },
        });

        // publish twist message
        cmd_vel.publish(twist);
    }

    handleStop(event) {
        console.log("Joystick stop");
        const { ros } = this.props;

        // ROS publisher topic cmd_vel
        var cmd_vel = new window.ROSLIB.Topic({
            ros: ros,
            name: config.topicName,
            messageType: config.messageType,
        });

        // create twist message
        var twist = new window.ROSLIB.Message({
            linear: {
                x: 0,
                y: 0,
                z: 0,
            },
            angular: {
                x: 0,
                y: 0,
                z: 0,
            },
        });

        // publish twist message
        cmd_vel.publish(twist);
    }

    render() {
        const { ros } = this.props;
        return (
            <div>
                {ros && (
                    <>
                    <h4>Controller</h4>
                    <Joystick
                        size={100} 
                        sticky={false}
                        followCursor={false}
                        baseColor="#a9c399" 
                        stickColor="#a8e489" 
                        move={this.handleMove} 
                        stop={this.handleStop} />
                    </>
                )}
            </div>
        );
    }
}

export default Teleoperation;