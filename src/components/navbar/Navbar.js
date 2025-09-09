import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../images/logo/logo.png";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import useWeb3 from "../../hooks/useWeb3";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const NavBar = () => {
  const { 
          handleDisconnectWallet, 
          handleConnectWallet,
          userAddress,
          balanceBNB,
          balanceUSDT
                      } = useWeb3();
  
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    setActivePage(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <Navbar expand="lg" sticky="top" className="py-3 bg-black-100">
      <Container>
        <Navbar.Brand href="#" onClick={() => navigate("/")} className="me-lg-5">
          <img className="logo" src={logo} alt="Real Estate logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll >
            <Nav.Link 
              href="#marketplace" 
              active={activePage === "home"} 
              onClick={() => {
                navigate("/")
                setActivePage("home")
              }}
            >
              Marketplace
            </Nav.Link>
            <Nav.Link 
              href="#about-us" 
              active={activePage === "about"} 
              className="px-lg-3"
              onClick={() => {
                navigate("/")
                setActivePage("about")
              }} >
              About Us
            </Nav.Link>
            <Nav.Link 
              href="#developers" 
              active={activePage === "developers"} 
              onClick={() => {
                navigate("/")
                setActivePage("developers")
              }}>
                Developers
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div className="d-flex align-items-center order">
          <span className="line d-lg-inline-block d-none"></span>
          <i 
            className="fa-regular fa-heart" 
            active={activePage === "favorites"} 
            onClick={() => {
              navigate("/favorites")
              setActivePage("favorites")
            }}
          />
          {userAddress && balanceBNB && balanceUSDT && (
            <div className="d-flex align-items-center text-white ms-5">
              <span className="me-2">{Number(balanceBNB).toFixed(2)} BNB</span>
              <span>{Number(balanceUSDT).toFixed(2)} USDT</span>
            </div>
          )}
            <Button
              variant="primary"
              className="btn-primary d-none d-lg-inline-block"
              onClick={userAddress ? handleDisconnectWallet : handleConnectWallet}
            >
              {userAddress ? `Disconnect from ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : "Connect Wallet"}
            </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
