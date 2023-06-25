import React, { useMemo } from "react";

import { useTable } from "react-table";
import { Table, Thead, Tbody, Tr, Td, Th, Button } from "@chakra-ui/react";

const TableContent = ({ doneTask }) => {
  // Using useMemo Hooks to avoid!
  // re-rendering the table every time.

  // The useMemo hook is used for memoization in React. It allows you to memoize the result of a computation and only recompute it when its dependencies change. By using useMemo, you can optimize the performance of your application by avoiding unnecessary computations.

  const columns = useMemo(
    () => [
      {
        Header: "Unique Identifier",
        accessor: "id",
      },
      {
        Header: "Values",
        accessor: "content",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: doneTask });

  return (
    <Table variant="striped" colorScheme="teal" {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th key={column.id} {...column.getHeaderProps()}>
                {column.render("Header")}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr key={row.id} {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td key={cell.id} {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default TableContent;
