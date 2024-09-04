import styled from "styled-components";
import type { GuessInterface } from "../types";
import { BLOW_COLOR, HIT_COLOR, MISS_COLOR } from "../color";

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
`;

const StyledBox = styled.div`
  color: #ffffff;
  background-color: ${({ color }) => color};
  border: 1px solid #ffffff;
  margin: 4px;
  text-align: center;
  width: 25%;
`;

interface Props {
  guesses: GuessInterface[];
}

export const GuessesComponent = ({ guesses }: Props) => {
  return (
    <StyledDiv>
      {guesses.map((guess) => (
        <StyledBox
          key={guess.index}
          color={
            guess.result === "HIT"
              ? HIT_COLOR
              : guess.result === "BLOW"
              ? BLOW_COLOR
              : MISS_COLOR
          }
        >
          {guess.value}
        </StyledBox>
      ))}
    </StyledDiv>
  );
};
