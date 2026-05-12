import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { AccountsList } from "./components/AccountsList";
import { AccountDetail } from "./components/AccountDetail";
import { CensusList } from "./components/CensusList";
import { DeductionList } from "./components/DeductionList";
import { FileDetail } from "./components/FileDetail";
import { SchemaMapping } from "./components/SchemaMapping";
import { RuleStudio } from "./components/RuleStudio";
import { TasksExceptions } from "./components/TasksExceptions";
import { Analytics } from "./components/Analytics";
import { SystemHealth } from "./components/SystemHealth";
import { Admin } from "./components/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "accounts", Component: AccountsList },
      { path: "accounts/:id", Component: AccountDetail },
      { path: "census", Component: CensusList },
      { path: "deduction", Component: DeductionList },
      { path: "files/:id", Component: FileDetail },
      { path: "schema-mapping/:accountId", Component: SchemaMapping },
      { path: "rules", Component: RuleStudio },
      { path: "tasks", Component: TasksExceptions },
      { path: "analytics", Component: Analytics },
      { path: "system-health", Component: SystemHealth },
      { path: "admin", Component: Admin },
    ],
  },
]);
