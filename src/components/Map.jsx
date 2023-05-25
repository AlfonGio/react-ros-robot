import React, { Component } from "react";

class Map extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.view_map = this.view_map.bind(this);
    }

    componentDidMount() {
        const { ros } = this.props;
        if (ros) {
            this.view_map(ros);
        }
    }

    view_map(ros) {
        console.log(ros);
        console.log("Getting map...");
        const ROS2D = window.ROS2D;

        // var viewer_map = new ROS2D.Viewer({
        //     divID: "nav_div",
        //     width: 640,
        //     height: 480,
        // });

        // var navClient = new ROS2D.OccupancyGridClient({
        //     ros: this.props.ros,
        //     topic: "/map",
        //     rootObject: viewer_map.scene,
        // });

        // navClient.on("change", function () {
        //     viewer_map.scaleToDimensions(navClient.currentImage.width, navClient.currentImage.height);
        //     viewer_map.shift(navClient.currentImage.pose.position.x, navClient.currentImage.pose.position.y);
        // });

        var viewer_image = new ROS2D.Viewer({
            divID: "img",
            width: 640,
            height: 480,
        });

        var gridClient = new ROS2D.ImageMapClient({
            ros: this.props.ros,
            rootObject: viewer_image.scene,
            image: "trial2_rrobot_save.pgm"
        });

        gridClient.on("change", function () {
            viewer_image.scaleToDimensions(gridClient.currentImage.width, gridClient.currentImage.height);
            viewer_image.shift(gridClient.currentImage.pose.position.x, gridClient.currentImage.pose.position.y);
        });

        // document.getElementById("nav_div").appendChild(viewer.renderer.domElement);
    }

    render() {
        const { ros } = this.props;
        return (
            <div>
                {ros && (
                    <>
                        <div id="img">Viewer</div>
                    </>
                )}
            </div>
        );
    }
}

export default Map;