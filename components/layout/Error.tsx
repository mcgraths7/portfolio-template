import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const TextCenter = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-4);
`;

const Message = styled.p`
  font-size: var(--text-lg);
`;

export default function Error() {
  return (
    <Container>
      <TextCenter>
        <Title>Something went wrong</Title>
        <Message>Please try again later.</Message>
      </TextCenter>
    </Container>
  );
}
