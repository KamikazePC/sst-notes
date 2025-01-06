import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import Routes from "./Routes";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
        {/* Use Navbar.Brand as={Link} to="/" */}
        <Navbar.Brand as={Link} to="/" className="fw-bold text-muted">
          Scratch
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* Use Nav.Link as={Link} to="/..." */}
          <Nav activeKey={window.location.pathname}>
            <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes />
    </div>
  );
}

export default App;
