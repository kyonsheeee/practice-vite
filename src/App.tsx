import { Form } from "antd";
import {
  StyledButton,
  StyledCard,
  StyledDiv,
  StyledFormItem,
  StyledInput,
} from "./Styled";

const App = () => {
  const [form] = Form.useForm();
  const onFinish = async () => {
    await form.validateFields();
    console.log("onFinish");
  };

  return (
    <>
      <StyledCard>
        <Form onFinish={onFinish}>
          <StyledFormItem
            name="4digit number"
            rules={[
              { required: true, message: "input: [0000-9999]" },
              {
                pattern: /^[0-9]{4}$/,
                message: "input: [0000-9999]",
              },
            ]}
            validateTrigger="submit"
          >
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
