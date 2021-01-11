import React from "react";
import styled from "styled-components";
import logo from "../image/logo.png";

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  background: #C0C0C0;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const LogoSection = styled.div`
  flex: 1;
`;

const UserSection = styled.div`
  flex: 1;
`;

const Image = styled.img``;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoSection>
        <Image src={logo} />
      </LogoSection>
      <UserSection></UserSection>
    </HeaderContainer>
  );
};

export default Header;
