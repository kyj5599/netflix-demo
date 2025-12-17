import React, { useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./app-layout.css";

const NETFLIX_LOGO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";

const AppLayout = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const trimmedQuery = useMemo(() => query.trim(), [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextUrl = trimmedQuery
      ? `/movies?q=${encodeURIComponent(trimmedQuery)}`
      : "/movies";
    navigate(nextUrl);
  };

  return (
    <div className="app-shell">
      <Navbar
        expand="lg"
        variant="dark"
        className="netflix-navbar"
        sticky="top"
      >
        <Container fluid className="px-4">
          <Navbar.Brand as={NavLink} to="/" className="netflix-brand">
            <img
              className="netflix-logo"
              src={NETFLIX_LOGO_URL}
              alt="Netflix"
              width={92}
              height={25}
              decoding="async"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/movies">
                Movies
              </Nav.Link>
            </Nav>
            <Form className="d-flex gap-2" onSubmit={handleSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="netflix-search-input"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="outline-danger"
                className="netflix-search-btn"
              >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
