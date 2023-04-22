import { Component } from "react";
import { Joystick } from "react-joystick-component";
import Config from "../scripts/config"

class Teleoperation extends Component {
    state = { ros: null };

    constructor() {
        super();
        this.init_connection();

        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }

    init_connection() {
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", () => {
            console.log("connection established from Teleoperation Component!");
            this.setState({ connected: true });
        });

        this.state.ros.on("close", () => {
            console.log("connection is closed from Teleoperation Component!");
            this.setState({ connected: false });
            setTimeout(() => {
                try {
                    this.state.ros.connect("ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PORT + "");
                } catch (error) {
                    console.log("connection problem");
                }
            }, Config.RECONNECTION_TIMER);
        });

        try {
            this.state.ros.connect("ws://" + Config.ROSBRIDGE_SERVER_IP + ":" + Config.ROSBRIDGE_SERVER_PORT + "");
        } catch (error) {
            console.log("connection problem");
        }
    }

    handleMove(event) {
        console.log("handle move");

        // ROS publisher on the topic cmd_vel
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: "geometry_msgs/Twist",
        });

        // Publish twist message to rosbridge
        var twist = new window.ROSLIB.Message({
            linear: {
                x: event.y / 5,
                y: 0.0,
                z: 0.0,
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: -event.x / 5,
            },
        });

        // Publish the message to the cmd_vel topic
        cmd_vel.publish(twist);
    }

    handleStop(event) {
        console.log("handle stop");

        // ROS publisher on the topic cmd_vel
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: "geometry_msgs/Twist",
        });

        // Publish twist message to rosbridge
        var twist = new window.ROSLIB.Message({
            linear: {
                x: 0.0,
                y: 0.0,
                z: 0.0,
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: 0.0,
            },
        });

        // Publish the message to the cmd_vel topic
        cmd_vel.publish(twist);
    }

    render() {
        return (
            <div>
                <Joystick
                    size={100}
                    sticky={true}
                    baseColor="#EEEEEE"
                    stickColor="#BBBBBB"
                    move={this.handleMove}
                    stop={this.handleStop}>
                </Joystick>
            </div>
        );
    }
}

export default Teleoperation;