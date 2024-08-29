import { Form } from "antd";
import { useEffect, useState } from "react";
import { GuessesComponent } from "./components/GuessesComponent";
import {
  StyledButton,
  StyledCard,
  StyledDiv,
  StyledFormItem,
  StyledInput,
} from "./components/Styled";
import { generateAnswer } from "./generateAnswer";
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
  const [answer, setAnswer] = useState<string[]>([]);
  const [history, setHistory] = useState<Guesses[]>([]);
  const [finish, setFinish] = useState<boolean>(false);

  useEffect(() => {
    setAnswer(generateAnswer());
  }, []);

  const onFinish = async (value: { inputNumber: string }) => {
    await form.validateFields();
    // console.log("onFinish");

    if (finish) {
      setAnswer(generateAnswer());
      setHistory([]);
      setFinish(false);
      form.resetFields();
      return;
    }

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
    if (guesses.every((guess) => guess.result === "HIT")) {
      setFinish(true);
    }

    // Game over
    if (newHistory.length >= 5) {
      setFinish(true);
    }
  };

  return (
    <>
      <StyledCard>
        <Form onFinish={onFinish}>
          {history.map((guesses) => (
            <GuessesComponent
              key={guesses.index} guesses={guesses.guesses}
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
              {finish ? "Try again" : "Done"}
            </StyledButton>
          </StyledFormItem>
        </Form>
        <StyledDiv color="#377e22">
          The position and the number are correct
        </StyledDiv>
        <StyledDiv color="#958129">
          Only the position of the number is wrong
        </StyledDiv>
        <StyledDiv color="#5c0e09">
          Both the position and the number are wrong
        </StyledDiv>
      </StyledCard>
    </>
  );
};

export default App;
