import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const VisuallyHidden = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  top: 20px;
  width: 1px;
`;

const NoRecord = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
`;

export default {
  VisuallyHidden,
  NoRecord,
};
