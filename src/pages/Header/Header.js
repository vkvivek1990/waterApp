import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.jpg";

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  height:50px;
  background: #fff;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const LogoSection = styled.div`
  flex: flex-start;  
  height:90px;
  margin-left:120px  
`;

const UserSection = styled.div`
  flex: 1;
`;

const Image = styled.img``;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoSection>
        <Image height="100%" src={logo} />
      </LogoSection>
      <UserSection></UserSection>
    </HeaderContainer>
  );
};

export default Header;