import React from 'react';
import PropTypes from 'prop-types';
import { groupBy, isEmpty, filter } from 'lodash';
import TodoTable from 'components/TodoTable';
import GroupedTable from 'components/GroupedTable';
import searching from 'utils/searching';

function CompletedTodo({
  index,
  activeTab,
  todoData,
  handldeTodoActions,
  searchKeyword,
  groupByKey,
}) {
  const generateTodo = todo => {
    const { currentState } = todo;
    if (currentState === 'completed') {
      return todo;
    }
    return null;
  };

  const getCompletedTodos = () => {
    if (!isEmpty(searchKeyword)) {
      return filter(todoData, item => {
        const isSearchingMatched = searching(item, searchKeyword);

        if (isSearchingMatched) {
          return generateTodo(item);
        }
        return null;
      });
    }
    return filter(todoData, item => generateTodo(item));
  };

  const renderTable = () => {
    const todos = getCompletedTodos();

    if (!isEmpty(groupByKey) && !isEmpty(todos)) {
      const groupedTodos = groupBy(todos, groupByKey);
      return (
        <GroupedTable
          groupedTodos={groupedTodos}
          groupByKey={groupByKey}
          handldeTodoActions={handldeTodoActions}
        />
      );
    }

    return (
      <TodoTable
        todoData={todos}
        handldeTodoActions={handldeTodoActions}
        searchKeyword={searchKeyword}
      />
    );
  };

  return (
    <div role="tabpanel" hidden={index !== activeTab}>
      {renderTable()}
    </div>
  );
}

CompletedTodo.propTypes = {
  index: PropTypes.number,
  activeTab: PropTypes.number,
  todoData: PropTypes.array,
  handldeTodoActions: PropTypes.func,
  searchKeyword: PropTypes.string,
  groupByKey: PropTypes.string,
};

export default CompletedTodo;
