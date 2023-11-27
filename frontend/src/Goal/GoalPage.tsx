import React, { CSSProperties, useContext, useEffect } from "react";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { Goal, Progress, Record, ResponseError as EResponse } from "api-client";
import { Skeleton, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import moment from "moment";

import { goalsApi } from "../api";
import { RenderAsync } from "../RenderAsync";

import { NewRecordForm } from "./NewRecordForm";
import { ProgressChart } from "./ProgressChart";
import { RecordsTable, RecordsTableSkeleton } from "./RecordsTable";
import { ResponseError } from "../components/ResponseError";
import { AppControlContext } from "../AppLayout";

export function GoalPage() {
  const { goal, progress, records } = useLoaderData() as {
    goal: Goal;
    progress: Promise<Progress>;
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
        resolve={Promise.all([progress, records])}
        fallback={<Skeleton height={300} />}
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
              <p>Could not load progress 😬</p>
              <pre>{JSON.stringify(reason)}</pre>
            </div>
          );
        }}
        renderElement={([, resolvedRecords]) => (
          <ProgressChart goal={goal} records={resolvedRecords} />
        )}
      />

      {goal.intervalLength}
      <br />
      {JSON.stringify(moment.duration(goal.intervalLength).years())}

      <RenderAsync
        resolve={records}
        fallback={<RecordsTableSkeleton rowCount={4} />}
        renderErrorElement={() => <div>Could not load records 😬</div>}
        renderElement={(records) => <RecordsTable records={records} />}
      />

      <NewRecordForm
        opened={newRecordFormOpened}
        onClose={closeNewRecordForm}
        goal={goal}
        onSubmit={async (newRecord) => {
          await goalsApi.createRecord({ record: newRecord });
          closeNewRecordForm();
          revalidate();
        }}
      />
    </Stack>
  );
}
