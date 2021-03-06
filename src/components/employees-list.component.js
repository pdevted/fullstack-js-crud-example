import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import ReactTable from "react-table";
import styled from 'styled-components';
import Link from 'next/link';

const RemoveButton = styled.button.attrs({
  className: `btn btn-danger`
})``;

const EditButton = styled.button.attrs({
  className: `btn btn-secondary`
})``;

const EmployeesList = ({ onRemove }) => {
  const { employees } = useSelector(state => state.employee);

  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id'},
    { Header: 'Name', accessor: 'name'},
    { Header: 'Profession', accessor: 'profession' },
    { Header: 'Code', accessor: 'code' },
    { Header: 'Color', accessor: 'color' },
    { Header: 'Branch', accessor: 'branch' },
    { Header: 'City', accessor: 'city' },
    {
      Header: 'Assigned', 
      accessor: 'assigned',
      Cell: ({ row }) => (
        <div>
          <input type="checkbox" checked={row.assigned} disabled/>
        </div>
      )
    },
    {
      Cell: ({ row }) => (
        <span>
          <Link href={`/employee/edit?id=${row.id}`} as={`/employee/edit/${row.id}`}><EditButton>Edit</EditButton></Link>
        </span>
      )
    },
    {
      Cell: ({ row }) => (
        <span>
          <RemoveButton onClick={() => onRemove(row.id)}>Remove</RemoveButton>
        </span>
      )
    }
  ], []);

  return (
    <div style={{ padding: 10 }}>
      <ReactTable
        columns={columns}
        data={employees}
        loading={false}
        defaultPageSize={10}
        showPageSizeOptions={true}
        minRows={0}
      />
    </div>
  )
}

export default EmployeesList;