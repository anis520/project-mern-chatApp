import Landing from "../components/Landing/Landing";
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
          { path: "/app", element: <Welcome /> },
          { path: "/messages/t/:id", element: <ChatArea /> },
        ],
      },
      { path: "/profile", element: <Profile /> },
    ],
  },
  { path: "/", element: <Landing /> },
];

// export router
export default privateRouter;
