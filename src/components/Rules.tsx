import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin: 0;
  }
`;

export const RuleComponent = () => {
  return (
    <StyledDiv>
      <h1>Rule</h1>
      <p>The game is about guessing a 4-digit number.</p>
      <p>Answers may start with 0, as in 0123.</p>
      <p>
        Numbers used in 1-digit are not used in the other digits. Answers such as 1123 will not be given.
      </p>
      <p>If you can't guess with in 5 times, the game is over.</p>
    </StyledDiv>
  );
};
