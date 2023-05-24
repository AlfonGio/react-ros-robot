import React, { Component } from "react";

class Map extends Component {
    state = {

     };

    componentDidMount() {
        const { ros } = this.props;
        if (ros) {
            this.view_map(ros);
        }
    }

    view_map(ros) {
        var viewer = new Window.ROS2D.Viewer({
            divID: "nav_div",
            width: 640,
            height: 480,
        });

        var navClient = new Window.ROS2D.OccupancyGridClient({
            ros: ros,
            topic: "/map",
            continuous: true,
            rootObject: viewer.scene,
        });

        document.getElementById("nav_div").appendChild(viewer.renderer.domElement);
    }

    render() {
        const { ros } = this.props;
        return (
            <div>
                {ros && (
                    <>
                        <div id="nav_div">Viewer</div>
                    </>
                )}
            </div>
        );
    }
}

export default Map;