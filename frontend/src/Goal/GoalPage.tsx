import React from "react";
import { Link, useParams } from "react-router-dom";

export function GoalPage() {
  const { goalId } = useParams();
  return (
    <>
      <Link to="/">Back</Link>
      <div>Goals Page: {goalId}</div>
    </>
  );
}
