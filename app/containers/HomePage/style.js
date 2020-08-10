import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  justify-content: center;
  min-width: 700px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 992px;
  min-width: 700px;
  margin-top: 42px;
  padding: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export default {
  Root,
  Container,
  Wrapper,
};
