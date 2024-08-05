import { createBrowserRouter, redirect } from "react-router-dom";
import Toastify from "toastify-js";
import Login from "../views/Login";
import BaseLayout from "../views/BaseLayout";
import { gcpUrl, localUrl } from "../utils/baseUrl";
import Home from "../views/Home";
import AddArticle from "../views/AddArticle";
import EditArticle from "../views/EditArticle";
import Categories from "../views/Categories";
import EditImage from "../views/EditImage";
import AddUser from "../views/AddUser";
const url = gcpUrl;

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "You already logged in",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/");
      }
      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please log in first",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Home url={url} />,
      },
      {
        path: "/categories",
        element: <Categories url={url} />,
      },
      {
        path: "/add-user",
        element: <AddUser url={url} />,
      },
      {
        path: "/articles/add",
        element: <AddArticle url={url} />,
      },
      {
        path: "/articles/edit/:id",
        element: <EditArticle url={url} />,
      },
      {
        path: "/articles/image/:id",
        element: <EditImage url={url} />,
      },
    ],
  },
]);

export default router;
