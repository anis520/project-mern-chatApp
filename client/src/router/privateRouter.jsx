import ChatArea from "../components/chat/ChatArea";
import Welcome from "../components/chat/Welcome";
import Home from "../components/pages/Home";
import PrivateGard from "./PrivateGard";

// create Private router
const privateRouter = [
  {
    element: <PrivateGard />,
    children: [
      {
        element: <Home />,
        children: [
          { path: "/", element: <Welcome /> },
          { path: "/:id", element: <ChatArea /> },
        ],
      },
    ],
  },
];

// export router
export default privateRouter;
