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
import type { Guesses } from "./types";

const calcResult = (
  answer: string[],
  idx: number,
  value: string
): "HIT" | "BLOW" | "MISS" => {
  if (answer[idx] === value) {
    return "HIT";
  }
  if (answer.includes(value)) {
    return "BLOW";
  }
  return "MISS";
};

const App = () => {
  const [form] = Form.useForm();
  const [history, setHistory] = useState<Guesses[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [answer, resetAnswer] = useAnswer();

  const onFinish = async (value: { inputNumber: string }) => {
    // console.log("onFinish");

    if (gameOver) {
      resetAnswer();
      setHistory([]);
      setGameOver(false);
      form.resetFields();
      return;
    }

    await form.validateFields();

    const guesses = Array.from(value.inputNumber).map((item, index) => {
      return {
        index,
        value: item,
        result: calcResult(answer, index, item),
      };
    });

    const newHistory = history.concat({ index: history.length, guesses });
    setHistory(newHistory);

    // Clear!
    if (
      guesses.every((guess) => guess.result === "HIT") ||
      newHistory.length >= 5
    ) {
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
              { required: true, message: "input: [0000-9999]" },
              {
                pattern: /^[0-9]{4}$/,
                message: "input: [0000-9999]",
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
        <Description color="#377e22">
          The position and the number are correct
        </Description>
        <Description color="#958129">
          Only the position of the number is wrong
        </Description>
        <Description color="#5c0e09">
          Both the position and the number are wrong
        </Description>
      </StyledCard>
      <RuleComponent />
    </>
  );
};

export default App;
