import React from "react";
import App from "./../app.jsx";

import Home from "./../pages/home/home.js";
import Error from "./../pages/error/error.js";
import TableElements from "../components/tables/table-elements.js";
import TablePlugins from "../components/tables/table-plugins.js";
import { Outlet } from "react-router-dom";
import MembersTable from "../components/tables/table-plugins1.js";
import ContactsListWithFolders from "../components/tables/test.js";
import AddMember from "../components/tables/add-member.js";
import EditMember from "../components/tables/edit-member.js";
import ViewMember from "../components/tables/view-member.js";
import DummyTable from "../components/tables/dummy-table.js";
import MainFilters from "../components/filters/main-filters.js";


const AppRoute = [
  {
    path: "*",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "*", element: <Error /> },
      {
        path: "table/*",
        element: <Outlet />,
        children: [
          { path: "elements", element: <TableElements /> },
          { path: "plugins", element: <TablePlugins /> },
          { path: "plugins1", element: <MembersTable /> },
          { path: "foldersview", element: < ContactsListWithFolders /> },
          { path: 'dummyTable', element: <DummyTable /> },
          { path: 'my-filters', element: <MainFilters /> },
          { path: "add-member", element: <AddMember /> },
          { path: "edit/member/:id", element: <EditMember /> },
          { path: "view/member/:id", element: <ViewMember /> },



          // { path: "*", element: <ExtraError /> },
        ],
      },
    ],
  },
];

export default AppRoute;
