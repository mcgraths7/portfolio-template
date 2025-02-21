import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Spinner = styled.div`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: 0.5rem solid rgba(0, 0, 0, 0.1);
  border-top-color: rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

export default function Loading() {
  return (
    <Container>
      <Spinner role="status">
        <VisuallyHidden>Loading...</VisuallyHidden>
      </Spinner>
    </Container>
  );
}
