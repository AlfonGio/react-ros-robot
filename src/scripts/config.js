const config = {
    websocketURL: "ws://172.20.39.85:9090",
    reconnectDelay: 5000,
    topicName: "/cmd_vel_joy",
    messageType: "geometry_msgs/msg/Twist",
    topicRobotPose: "/amcl_pose",
    messageTypePose: "geometry_msgs/msg/PoseWithCovarianceStamped",
};

export default config;