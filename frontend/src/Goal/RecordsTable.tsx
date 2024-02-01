import React, { useState } from "react";

import { Button, Skeleton, Table } from "@mantine/core";
import { Record } from "api-client";

export interface RecordsTableProps {
  records: Record[];
  onDelete: (recordId: string) => Promise<void>;
}

const asyncActionHandler =
  (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    event: () => Promise<void>
  ) =>
  async () => {
    setLoading(true);
    await event();
    setLoading(false);
  };

function RecordRow({
  record,
  onDelete,
}: {
  record: Record;
  onDelete: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Table.Tr>
      <Table.Td>{record.date.toDateString()}</Table.Td>
      <Table.Td>{record.amount}</Table.Td>
      <Table.Td>{record.progress}</Table.Td>
      <Table.Td>
        <Button
          loading={loading}
          onClick={asyncActionHandler(setLoading, onDelete)}
          size="xs"
          variant="danger"
        >
          Delete
        </Button>
      </Table.Td>
    </Table.Tr>
  );
}

export function RecordsTable({ records, onDelete }: RecordsTableProps) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Date</Table.Th>
          <Table.Th>Amount</Table.Th>
          <Table.Th>Progress</Table.Th>
          <Table.Th></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {records.map((record) => (
          <RecordRow
            key={record.id}
            onDelete={() => onDelete(record.id!)}
            record={record}
          />
        ))}
      </Table.Tbody>
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
          <Table.Th>Progress</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
