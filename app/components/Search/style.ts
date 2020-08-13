import styled, { css } from 'styled-components';
import { IconButton } from '@material-ui/core';

const IconBtn = styled(IconButton)<{ keyword: boolean }>`
  padding: 5px;

  ${props =>
    !props.keyword &&
    css`
      visibility: hidden;
    `}
`;

export default {
  IconBtn,
};
