import React from 'react';
import PropTypes from 'prop-types';
import { filter, groupBy, isEmpty, map } from 'lodash';
import TodoTable from 'components/TodoTable';
import GroupedTable from 'components/GroupedTable';
import searching from 'utils/searching';

function AllTodo({
  index,
  activeTab,
  todoData,
  handldeTodoActions,
  searchKeyword,
  groupByKey,
}) {
  const generateTodo = todo => {
    const { currentState } = todo;
    if (currentState === 'completed' || currentState === 'completing') {
      return {
        ...todo,
        isStrikeOutText: 1,
      };
    }
    return todo;
  };

  const getAlltodos = () => {
    if (!isEmpty(searchKeyword)) {
      const data = map(todoData, item => {
        const isSearchingMatched = searching(item, searchKeyword);

        if (isSearchingMatched) {
          return generateTodo(item);
        }
        return null;
      });
      return filter(data, item => item);
    }
    return map(todoData, item => generateTodo(item));
  };

  const renderTable = () => {
    const todos = getAlltodos();

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

AllTodo.propTypes = {
  index: PropTypes.number,
  activeTab: PropTypes.number,
  todoData: PropTypes.array,
  handldeTodoActions: PropTypes.func,
  searchKeyword: PropTypes.string,
  groupByKey: PropTypes.string,
};

export default AllTodo;
