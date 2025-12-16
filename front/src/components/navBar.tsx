import { Nav, Navbar } from "react-bootstrap";

export const NavBar = ({ callBack }: { callBack: () => void }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow">
      <Nav className="w-100 px-4 d-flex justify-content-around flex-row gap-3 gap-md-5">
        <Nav.Link href="https://sebastianmolina.netlify.app/" target="_blank">
          Portfolio
        </Nav.Link>

        <Nav.Link onClick={() => callBack()}>Home</Nav.Link>
      </Nav>
    </Navbar>
  );
};
