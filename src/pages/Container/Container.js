import React from "react";
import styled from "styled-components";
import bgWater from "../../assets/waterBg.jpg";

const CenterContainer = styled.div`
  display: flex;
  width: 100%;  
  height:600px;
  background:#92b0ca;  
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

// const LogoSection = styled.div`
//   flex: 1;
// `;

// const UserSection = styled.div`
//   flex: 1;
// `;

// const Image = styled.img``;


const Container = () => {
  return (
    <CenterContainer> 
    <div className="container">
  <div className="round-container">
    <div className="round-section">
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  </div>
</div>     
    </CenterContainer>
  );
};

export default Container;