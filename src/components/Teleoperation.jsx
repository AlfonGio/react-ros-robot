import React, { Component } from "react";
import { Joystick } from "react-joystick-component";

class Teleoperation extends Component {
    state = { };

    handleMove() {
        console.log("Joystick move");
        // ROS publisher topic cmd_vel
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.props.ros,
        });
        // create twist message

        // publish twist message
    }

    handleStop() {
        console.log("Joystick stop");
    }

    render() {
        const { ros } = this.props;
        return (
            <div>
                {ros && (
                    <>
                    <h3>Controller</h3>
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