/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from 'react';
import { isEmpty, map, reject } from 'lodash';
import { Box, Typography } from '@material-ui/core';
import AddTodoBtn from 'components/AddTodoBtn';
import TaskModal from 'components/TaskModal';
import TodoTabs from 'components/TodoTabs';
import Search from 'components/Search';
import GroupByDropdown from 'components/GroupByDropdown';
import Styled from './style';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState('add');
  const [viewId, setViewId] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [todoData, setTodoData] = useState([]);
  const [groupByKey, setGroupByKey] = useState('');
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (!isEmpty(todos)) {
      setTodoData(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoData));
  }, [todoData]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddTodo = () => {
    setAction('add');
    handleModalOpen();
  };

  const handleSaveTodo = data => {
    setTodoData([...todoData, data]);
  };

  const handleUpdateTodo = data => {
    const result = map(todoData, item => {
      const { id } = item;
      if (id === viewId) {
        return data;
      }
      return item;
    });
    setTodoData(result);
  };

  const handldeTodoActions = params => {
    const { action: actionType, id: elementId } = params;
    setAction(actionType);
    setViewId(elementId);

    if (actionType === 'complete') {
      const result = map(todoData, item => {
        const { id } = item;
        if (id === elementId) {
          return {
            ...item,
            currentState: 'completed',
          };
        }
        return item;
      });
      setTodoData(result);
    } else if (actionType === 'undoComplete') {
      const result = map(todoData, item => {
        const { id } = item;
        if (id === elementId) {
          return {
            ...item,
            currentState: 'pending',
          };
        }
        return item;
      });
      setTodoData(result);
    } else {
      handleModalOpen();
    }
  };

  const handleDeleteTodo = () => {
    const result = reject(todoData, { id: viewId });
    setTodoData(result);
  };

  const handleSearchChange = value => {
    setSearchKeyword(value);
  };

  const onClearSearch = () => {
    setSearchKeyword('');
  };

  const handleGroupBy = value => {
    setGroupByKey(value);
  };

  return (
    <Styled.Root>
      <Styled.Container>
        <Styled.Wrapper>
          <Typography variant="h5">ToDo App</Typography>
          <Box display="flex" alignItems="center">
            <Search
              searchKeyword={searchKeyword}
              onSearchChange={handleSearchChange}
              onClearSearch={onClearSearch}
            />
            <GroupByDropdown
              groupByKey={groupByKey}
              onChnageGroupBy={handleGroupBy}
            />
          </Box>
        </Styled.Wrapper>
        <AddTodoBtn handleAddTodo={handleAddTodo} />
        <TaskModal
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          onSave={handleSaveTodo}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
          allTodos={todoData}
          action={action}
          viewId={viewId}
        />
        <TodoTabs
          todoData={todoData}
          handldeTodoActions={handldeTodoActions}
          searchKeyword={searchKeyword}
          groupByKey={groupByKey}
        />
      </Styled.Container>
    </Styled.Root>
  );
}
