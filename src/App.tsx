import { Form } from "antd";
import {
  StyledButton,
  StyledCard,
  StyledDiv,
  StyledFormItem,
  StyledInput,
} from "./Styled";

const App = () => {
  return (
    <>
      <StyledCard>
        <Form>
          <StyledFormItem>
            <StyledInput placeholder="Enter 4-digit number" />
          </StyledFormItem>
          <StyledFormItem>
            <StyledButton type="primary" htmlType="submit">
              Done
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
