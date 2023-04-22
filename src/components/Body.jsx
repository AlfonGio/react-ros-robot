import { Component } from "react";
import { Container } from "react-bootstrap";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from "./Home";
import About from "./About";

class Body extends Component {
    state = {};
    render() {
        return (
            <Container>
                <BrowserRouter>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </BrowserRouter>
            </Container>
        );
    }
}

export default Body;