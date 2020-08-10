import styled from 'styled-components';
import { TableCell, TableRow } from '@material-ui/core';

const Row = styled(TableRow)`
  background-color: #fdf7f7;
  cursor: pointer;

  &:hover {
    background-color: #f5f0f0;
  }
`;

const Cell = styled(TableCell)`
  padding: 0;
`;

export default {
  Row,
  Cell,
};
