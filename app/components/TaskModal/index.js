import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import getTimestamp from 'utils/timestamp';
import { find, isEmpty, trim } from 'lodash';
import Styled from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialTodoData = {
  id: null,
  title: '',
  description: '',
  dueDate: '',
  priority: 0,
  createdAt: '',
  currentState: 'pending',
  isReadOnly: false,
};

function TaskModal({
  isModalOpen,
  handleModalClose,
  onSave,
  onUpdate,
  onDelete,
  allTodos,
  action,
  viewId,
}) {
  const [todoData, setTodoData] = useState(initialTodoData);
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  useEffect(() => {
    if (isModalOpen && action !== 'add') {
      const todoList = find(allTodos, { id: viewId });
      const result = {
        ...todoList,
        isReadOnly: action !== 'edit',
      };
      setTodoData(result);
    }
  }, [isModalOpen]);

  const handleInputFocus = e => {
    const {
      target: { name },
    } = e;
    return name === 'title' ? setTitleError('') : setDescriptionError('');
  };

  const handleChange = event => {
    const {
      target: { name, value },
    } = event;
    setTodoData({
      ...todoData,
      [name]: value,
    });
  };

  const setInitialTodoData = () => {
    setTodoData(initialTodoData);
  };

  const handleValidation = () => {
    const { title, description } = todoData;
    const trimedTitle = trim(title);
    const trimedDescription = trim(description);
    const isInvalidTitle = trimedTitle.length < 3;
    const isInvalidDescription = trimedDescription.length < 10;

    if (isInvalidTitle) {
      setTitleError('min. 3 characters are required');
    }

    if (isInvalidDescription) {
      setDescriptionError('min. 10 characters are required');
    }
    return !isInvalidTitle && !isInvalidDescription;
  };

  const handleSaveTodo = () => {
    const isValidAllInputs = handleValidation();

    if (isValidAllInputs) {
      const data = {
        ...todoData,
        isReadOnly: true,
        id: new Date().getTime(),
        createdAt: getTimestamp(),
      };
      onSave(data);
      setInitialTodoData();
      handleModalClose();
    }
  };

  const handleUpdateTodo = () => {
    const isValidAllInputs = handleValidation();

    if (isValidAllInputs) {
      const data = {
        ...todoData,
        isReadOnly: true,
      };
      onUpdate(data);
      setInitialTodoData();
      handleModalClose();
    }
  };

  const handleDeleteTodo = () => {
    onDelete();
    handleModalClose();
  };

  const onCloseModal = () => {
    setTitleError('');
    setDescriptionError('');
    setInitialTodoData();
    handleModalClose();
  };

  const handleEdit = () => {
    setTodoData({
      ...todoData,
      isReadOnly: false,
    });
  };

  const renderSaveBtn = () => {
    switch (action) {
      case 'add': {
        return (
          <Button variant="contained" color="primary" onClick={handleSaveTodo}>
            Save
          </Button>
        );
      }

      case 'edit': {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateTodo}
          >
            Update
          </Button>
        );
      }

      case 'delete': {
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteTodo}
          >
            Yes, Delete
          </Button>
        );
      }
      case 'view': {
        const { isReadOnly } = todoData;
        if (!isReadOnly) {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateTodo}
            >
              Update
            </Button>
          );
        }
        return null;
      }

      default: {
        return null;
      }
    }
  };

  const renderConfirmationBtn = () => (
    <Styled.ActionsWrapper>
      <Styled.CancelBtn
        onClick={onCloseModal}
        variant="outlined"
        color="primary"
      >
        {action === 'delete' ? 'No' : 'Cancel'}
      </Styled.CancelBtn>
      {renderSaveBtn()}
    </Styled.ActionsWrapper>
  );

  const renderEditBtn = () => {
    const { isReadOnly } = todoData;
    if (isReadOnly) {
      return (
        <Tooltip title="Edit">
          <IconButton onClick={handleEdit}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
      );
    }
    return null;
  };

  const renderDialogTitle = () => {
    switch (action) {
      case 'add': {
        return `Create New Todo`;
      }

      case 'edit': {
        return `Edit Task`;
      }

      case 'delete': {
        return `Do you want to delete this task?`;
      }

      case 'view': {
        return (
          <Styled.AlignEnd>
            <span>Task Details</span>
            {renderEditBtn()}
          </Styled.AlignEnd>
        );
      }

      default: {
        return null;
      }
    }
  };

  return (
    <Dialog
      onClose={onCloseModal}
      open={isModalOpen}
      TransitionComponent={Transition}
      fullWidth
    >
      <DialogTitle>{renderDialogTitle()}</DialogTitle>
      <DialogContent dividers>
        <Styled.Field
          label="Summary"
          name="title"
          value={todoData.title}
          onFocus={handleInputFocus}
          onChange={handleChange}
          inputProps={{
            maxLength: 140,
            readOnly: todoData.isReadOnly,
          }}
          error={!isEmpty(titleError)}
          helperText={titleError}
          fullWidth
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={todoData.description}
          onFocus={handleInputFocus}
          onChange={handleChange}
          rows={10}
          inputProps={{
            maxLength: 500,
            readOnly: todoData.isReadOnly,
          }}
          error={!isEmpty(descriptionError)}
          helperText={descriptionError}
          multiline
          fullWidth
        />
        <Styled.Wrapper>
          <TextField
            label="Due Date"
            type="date"
            name="dueDate"
            defaultValue={getTimestamp(todoData.dueDate)}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: todoData.isReadOnly,
            }}
          />
          <FormControl>
            <InputLabel shrink id="priority-dropdown-label">
              Priority
            </InputLabel>
            <Select
              labelId="priority-dropdown-label"
              name="priority"
              value={todoData.priority}
              onChange={handleChange}
              inputProps={{ readOnly: todoData.isReadOnly }}
              displayEmpty
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Low</MenuItem>
              <MenuItem value={2}>Medium</MenuItem>
              <MenuItem value={3}>High</MenuItem>
            </Select>
          </FormControl>
        </Styled.Wrapper>
      </DialogContent>
      <DialogActions>{renderConfirmationBtn()}</DialogActions>
    </Dialog>
  );
}

TaskModal.propTypes = {
  isModalOpen: PropTypes.bool,
  handleModalClose: PropTypes.func,
  onSave: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  allTodos: PropTypes.array,
  action: PropTypes.string,
  viewId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TaskModal;
