import Profile from "../components/Profile/Profile";
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
      { path: "/profile", element: <Profile /> },
    ],
  },
];

// export router
export default privateRouter;
