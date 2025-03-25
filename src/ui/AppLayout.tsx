import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const StyledMain = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const Container = styled.div`
  max-width: 120rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledDiv>
      <Header />
      <Sidebar />
      <StyledMain>
        <Container>
          <Outlet />
        </Container>
      </StyledMain>
    </StyledDiv>
  );
}

export default AppLayout;
