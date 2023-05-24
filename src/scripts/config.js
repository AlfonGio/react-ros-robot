const config = {
    websocketURL: "ws://172.20.39.85:9090",
    reconnectDelay: 5000,
    topicName: "/cmd_vel",
    messageType: "geometry_msgs/msg/Twist",
    topicRobotPose: "/amcl_pose",
    messageTypePose: "geometry_msgs/msg/PoseWithCovarianceStamped",
    topicRobotVel: "/odom",
    messageTypeVel: "nav_msgs/msg/Odometry",
};

export default config;