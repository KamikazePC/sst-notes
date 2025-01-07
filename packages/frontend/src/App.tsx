import { useState, useEffect  } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import Routes from "./Routes";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { onError } from "./lib/errorLib";


import { AppContext, AppContextType } from "./lib/contextLib";


function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const nav = useNavigate();

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (error) {
      if (error !== "No current user") {
        onError(error);
      }
    }
  
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);
  
    nav("/login");
  }

  return (  
   !isAuthenticating && (
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
            {isAuthenticated ? (
            <>
             <Nav.Link as={Link} to="/settings">
                  Settings
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
            ) : (
              <>
            <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <AppContext.Provider
        value={{ isAuthenticated, userHasAuthenticated } as AppContextType}
      >
        <Routes />
      </AppContext.Provider>
    </div>
  ));
}

export default App;   
