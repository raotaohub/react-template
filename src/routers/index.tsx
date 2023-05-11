import React from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import SuspenseComponent from "./Suspense";

// * 导入所有router 组件
const About = SuspenseComponent(React.lazy(() => import("@components/about")));
console.log("About", About);

const Expenses = SuspenseComponent(
  React.lazy(() => import("@components/expenses"))
);
const Home = SuspenseComponent(React.lazy(() => import("@components/home")));
const Invoice = SuspenseComponent(
  React.lazy(() => import("@components/invoice"))
);
const Invoices = SuspenseComponent(
  React.lazy(() => import("@components/invoices"))
);
const Layout = SuspenseComponent(React.lazy(() => import("@view/Layout")));
const NotFound = SuspenseComponent(React.lazy(() => import("@view/NotFound")));

export const rootRouter: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/layout" />,
  },
  {
    path: "/layout",
    // element: <Layout />,
    element: Layout,
    children: [
      {
        path: "/layout",
        element: <span>default layout content</span>,
      },
      {
        path: "/layout/home",
        // element: <Home />,
        element: Home,
      },
      {
        path: "/layout/about",
        // element: <About />,
        element: About,
      },
      {
        path: "/layout/expenses",
        // element: <Expenses />,
        element: Expenses,
      },
      {
        path: "/layout/invoices",
        // element: <Invoices />,
        element: Invoices,
        children: [
          {
            index: true,
            element: (
              <div>
                <p>Index-Router配置的用法说明</p>
                <p>
                  https://reactrouter.com/en/main/start/concepts#index-routes
                </p>
              </div>
            ),
          },
          {
            path: "/layout/invoices/:invoiceId",
            // element: <Invoice />,
            element: Invoice,
          },
        ],
      },
    ],
  },

  {
    path: "/404",
    // element: <NotFound />,
    element: NotFound,
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
