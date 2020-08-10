import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { Paper, Table, TableBody, TableContainer } from '@material-ui/core';
import CollapsibleRow from 'components/CollapsibleRow';

function GroupedTable({ groupedTodos, groupByKey, handldeTodoActions }) {
  const renderTableData = () =>
    map(groupedTodos, (todos, key) => (
      <CollapsibleRow
        key={key}
        todoData={todos}
        groupByKey={groupByKey}
        groupedValue={key}
        handldeTodoActions={handldeTodoActions}
      />
    ));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>{renderTableData()}</TableBody>
      </Table>
    </TableContainer>
  );
}

GroupedTable.propTypes = {
  groupedTodos: PropTypes.object,
  groupByKey: PropTypes.string,
  handldeTodoActions: PropTypes.func,
};

export default GroupedTable;
