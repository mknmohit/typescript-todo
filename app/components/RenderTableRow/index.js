import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, TableCell, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { PRIORITY as getPriority } from 'containers/App/constants';
import Styled from './style';

function RenderTableRow({ todoList, handldeTodoActions }) {
  const {
    id,
    title,
    dueDate,
    priority,
    createdAt,
    isStrikeOutText,
    currentState,
  } = todoList;

  const handleEdit = () => {
    const params = {
      action: 'edit',
      id,
    };
    handldeTodoActions(params);
  };

  const handleMarkDone = () => {
    const params = {
      action: 'complete',
      id,
    };
    handldeTodoActions(params);
  };

  const handleDelete = () => {
    const params = {
      action: 'delete',
      id,
    };
    handldeTodoActions(params);
  };

  const handleUndoComplete = () => {
    const params = {
      action: 'undoComplete',
      id,
    };
    handldeTodoActions(params);
  };

  const handleViewTodo = () => {
    const params = {
      action: 'view',
      id,
    };
    handldeTodoActions(params);
  };

  const renderCheckUncheck = () => {
    if (currentState === 'completed' || currentState === 'completing') {
      return (
        <Tooltip title="Re-Open">
          <IconButton onClick={handleUndoComplete}>
            <Styled.UndoIcon />
          </IconButton>
        </Tooltip>
      );
    }
    return (
      <Tooltip title="Mark Done">
        <IconButton onClick={handleMarkDone}>
          <Styled.CheckIcon />
        </IconButton>
      </Tooltip>
    );
  };

  const renderActions = () => (
    <div>
      <Tooltip title="Edit">
        <IconButton onClick={handleEdit}>
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>
      {renderCheckUncheck()}
      <Tooltip title="Delete">
        <IconButton onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>
    </div>
  );

  return (
    <Styled.Row>
      <Styled.Cell
        strikeout={isStrikeOutText}
        component="th"
        scope="row"
        onClick={handleViewTodo}
      >
        {title}
      </Styled.Cell>
      <Styled.Cell
        strikeout={isStrikeOutText}
        align="center"
        onClick={handleViewTodo}
      >
        {getPriority[priority]}
      </Styled.Cell>
      <Styled.Cell
        strikeout={isStrikeOutText}
        align="center"
        onClick={handleViewTodo}
      >
        {createdAt}
      </Styled.Cell>
      <Styled.Cell
        strikeout={isStrikeOutText}
        align="center"
        onClick={handleViewTodo}
      >
        {dueDate}
      </Styled.Cell>
      <TableCell align="center">{renderActions()}</TableCell>
    </Styled.Row>
  );
}

RenderTableRow.propTypes = {
  todoList: PropTypes.object,
  handldeTodoActions: PropTypes.func,
};

export default RenderTableRow;
