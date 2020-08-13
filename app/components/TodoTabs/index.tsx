import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import AllTodo from 'components/AllTodo';
import PendingTodo from 'components/PendingTodo';
import CompletedTodo from 'components/CompletedTodo';
import AllIcon from '@material-ui/icons/ListAlt';
import PendingIcon from '@material-ui/icons/HourglassEmpty';
import CompletedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

function TodoTabs({ todoData, handldeTodoActions, searchKeyword, groupByKey }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, tabValue) => {
    setActiveTab(tabValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab icon={<AllIcon />} label="All" value={0} />
          <Tab icon={<PendingIcon />} label="Pending" value={1} />
          <Tab icon={<CompletedIcon />} label="Completed" value={2} />
        </Tabs>
      </AppBar>
      <AllTodo
        index={0}
        activeTab={activeTab}
        todoData={todoData}
        handldeTodoActions={handldeTodoActions}
        searchKeyword={searchKeyword}
        groupByKey={groupByKey}
      />
      <PendingTodo
        index={1}
        activeTab={activeTab}
        todoData={todoData}
        handldeTodoActions={handldeTodoActions}
        searchKeyword={searchKeyword}
        groupByKey={groupByKey}
      />
      <CompletedTodo
        index={2}
        activeTab={activeTab}
        todoData={todoData}
        handldeTodoActions={handldeTodoActions}
        searchKeyword={searchKeyword}
        groupByKey={groupByKey}
      />
    </div>
  );
}

TodoTabs.propTypes = {
  todoData: PropTypes.array,
  handldeTodoActions: PropTypes.func,
  searchKeyword: PropTypes.string,
  groupByKey: PropTypes.string,
};

export default TodoTabs;
