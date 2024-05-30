import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Navbar from "../Components/Shared/Navbar";

const MainLayout = () => {
  const location = useLocation();

  return (
    <div>
      <SwitchTransition>
        <CSSTransition key={location.pathname} classNames="page" timeout={500}>
          <>
            <Navbar />
            <Outlet />
          </>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default MainLayout;
