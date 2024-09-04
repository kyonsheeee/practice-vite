import { Form } from "antd";
import { useState } from "react";
import { GuessesComponent } from "./components/GuessesComponent";
import { RuleComponent } from "./components/Rules";
import {
  Description,
  StyledButton,
  StyledCard,
  StyledFormItem,
  StyledInput,
} from "./components/Styled";
import { useAnswer } from "./hooks/useAnswer";
import type { GuessesInterface } from "./types";
import { BLOW_COLOR, HIT_COLOR, MISS_COLOR } from "./color";
import { generateGuess, isGameOver } from "./guess";

const App = () => {
  const [form] = Form.useForm();
  const [history, setHistory] = useState<GuessesInterface[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [answer, resetAnswer] = useAnswer();

  const onFinish = (value: { inputNumber: string }) => {
    // console.log("onFinish");

    if (gameOver) {
      resetAnswer();
      setHistory([]);
      setGameOver(false);
      form.resetFields();
      return;
    }

    const guesses = generateGuess(value.inputNumber, answer);
    const newHistory = history.concat({ index: history.length, guesses });
    setHistory(newHistory);

    // Clear!
    if (isGameOver(guesses, newHistory)) {
      setGameOver(true);
    }
  };

  return (
    <>
      <StyledCard>
        <Form onFinish={onFinish}>
          {history.map((guesses) => (
            <GuessesComponent
              key={guesses.index}
              guesses={guesses.guesses}
            ></GuessesComponent>
          ))}
          <StyledFormItem
            name="inputNumber"
            rules={[
              {
                validator: async (_, value) => {
                  if (gameOver) return Promise.resolve();
                  if (!value) {
                    throw new Error("This field is required.");
                  }
                  if (!/^[0-9]{4}$/.test(value)) {
                    throw new Error("input: [0000-9999]");
                  }
                  return Promise.resolve();
                },
              },
            ]}
            validateTrigger="onSubmit"
          >
            <StyledInput placeholder="Enter 4-digit number" />
          </StyledFormItem>
          <StyledFormItem>
            <StyledButton type="primary" htmlType="submit">
              {gameOver ? "Try again" : "Done"}
            </StyledButton>
          </StyledFormItem>
        </Form>
        <Description color={HIT_COLOR}>
          The position and the number are correct
        </Description>
        <Description color={BLOW_COLOR}>
          Only the position of the number is wrong
        </Description>
        <Description color={MISS_COLOR}>
          Both the position and the number are wrong
        </Description>
      </StyledCard>
      <RuleComponent />
    </>
  );
};

export default App;
