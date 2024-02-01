import React, { CSSProperties, useContext, useEffect } from "react";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";

import { Skeleton, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import { ResponseError as EResponse, Goal, Record } from "api-client";

import { AppControlContext } from "../AppLayout";
import { RenderAsync } from "../RenderAsync";
import { goalsApi } from "../api";
import { ResponseError } from "../components/ResponseError";
import { NewRecordForm } from "./NewRecordForm";
import { ProgressChart } from "./ProgressChart";
import { RecordsTable, RecordsTableSkeleton } from "./RecordsTable";

export function GoalPage() {
  const { goal, records } = useLoaderData() as {
    goal: Goal;
    records: Promise<Record[]>;
  };
  const { revalidate } = useRevalidator();
  const [
    newRecordFormOpened,
    { open: openNewRecordForm, close: closeNewRecordForm },
  ] = useDisclosure();

  const navigate = useNavigate();
  const appControls = useContext(AppControlContext);

  useEffect(() => {
    appControls.setTitle(goal.name);
    appControls.setLeadingAction({
      type: "button",
      p: "0px",
      id: "back",
      variant: "transparent",
      content: "Goals",
      leftIcon: <IconChevronLeft />,
    });
    appControls.setTrailingAction({
      type: "button",
      id: "log-record",
      variant: "filled",
      content: `Log ${goal.name.toLowerCase()}`,
    });
    appControls.onAction((actionId) => {
      switch (actionId) {
        case "back":
          return navigate("/goals");
        case "log-record":
          return openNewRecordForm();
        default:
          return;
      }
    });
  }, []);

  return (
    <Stack>
      <RenderAsync
        renderElement={(resolvedRecords) => (
          <ProgressChart goal={goal} records={resolvedRecords} />
        )}
        renderErrorElement={(reason) => {
          const containerStyle: CSSProperties = {
            height: 300,
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          };
          if (reason instanceof EResponse) {
            return (
              <div style={containerStyle}>
                <ResponseError responseError={reason} />
              </div>
            );
          }
          return (
            <div style={containerStyle}>
              <p>Could not load records 😬</p>
              <pre>{JSON.stringify(reason)}</pre>
            </div>
          );
        }}
        fallback={<Skeleton height={300} />}
        resolve={records}
      />

      <RenderAsync
        renderElement={(records) => (
          <RecordsTable
            onDelete={async (id) => {
              await goalsApi.deleteRecord({ recordId: id });
              revalidate();
            }}
            records={records}
          />
        )}
        fallback={<RecordsTableSkeleton rowCount={4} />}
        renderErrorElement={() => <div>Could not load records 😬</div>}
        resolve={records}
      />

      <NewRecordForm
        onSubmit={async (newRecord) => {
          await goalsApi.createRecord({ record: newRecord });
          closeNewRecordForm();
          revalidate();
        }}
        goal={goal}
        onClose={closeNewRecordForm}
        opened={newRecordFormOpened}
      />
    </Stack>
  );
}
