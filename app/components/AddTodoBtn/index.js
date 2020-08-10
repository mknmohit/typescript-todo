import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { Fab, Tooltip } from '@material-ui/core';

import Styled from './style';

function AddTodoBtn({ handleAddTodo }) {
  return (
    <Styled.Root>
      <Tooltip title="Create New Todo" placement="left">
        <Fab color="primary" onClick={handleAddTodo}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </Styled.Root>
  );
}

AddTodoBtn.propTypes = {
  handleAddTodo: PropTypes.func,
};

export default AddTodoBtn;
