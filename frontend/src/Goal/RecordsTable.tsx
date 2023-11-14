import { Skeleton, Table } from "@mantine/core";
import { Record } from "api-client";
import React from "react";

export interface RecordsTableProps {
  records: Record[];
}

export function RecordsTable({ records }: RecordsTableProps) {
  const rows = records.map((record) => (
    <Table.Tr key={record.id}>
      <Table.Td>{record.date.toDateString()}</Table.Td>
      <Table.Td>{record.amount}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Date</Table.Th>
          <Table.Th>Amount</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export function RecordsTableSkeleton({ rowCount }: { rowCount: number }) {
  const rows = Array(rowCount)
    .fill(null)
    .map((_, i) => (
      <Table.Tr key={i}>
        <Table.Td>
          <Skeleton>Foo</Skeleton>
        </Table.Td>
        <Table.Td>
          <Skeleton>Bar</Skeleton>
        </Table.Td>
      </Table.Tr>
    ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Date</Table.Th>
          <Table.Th>Amount</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
