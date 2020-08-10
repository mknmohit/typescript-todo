import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';

const Field = styled(TextField)`
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const AlignEnd = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CancelBtn = styled(Button)`
  margin-right: 16px;
`;

const ActionsWrapper = styled.div`
  margin: 8px 16px;
`;

export default {
  Field,
  Wrapper,
  AlignEnd,
  CancelBtn,
  ActionsWrapper,
};
