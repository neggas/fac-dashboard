import { Box, Flex, Table } from "@chakra-ui/react";
import { DataTableProps } from "./types";
import { fuzzyFilter, nextPage, previousPage } from "./utils";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import InputFieldDumb from "../../dumbs/InputField";
import Pagination from "./Pagination";

export const DataTable = <T,>({ data, columns }: DataTableProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Box borderWidth="1px" rounded="lg" maxHeight="400px" overflowY="auto">
      <Flex w="full" mt="20px" py="10px" justifyContent="flex-end" px="2">
        <InputFieldDumb
          name="search"
          placeholder="Rechercher..."
          maxW="300px"
          display="inline-block"
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </Flex>
      <Table.Root size="lg" rounded="lg" variant="outline">
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <React.Fragment key={header.id}>
                  <Table.ColumnHeader>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Table.ColumnHeader>
                </React.Fragment>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Box
        w="full"
        mt="16"
        display="flex"
        justifyContent="flex-end"
        justifyItems="center"
        pr="2"
        mb="4">
        <Pagination
          count={table.getPageCount()}
          pageSize={table.getState().pagination.pageSize}
          defaultPage={table.getState().pagination.pageIndex + 1}
          nextPage={() => nextPage(table)}
          previousPage={() => previousPage(table)}
        />
      </Box>
    </Box>
  );
};
