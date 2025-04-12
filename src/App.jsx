import { BrowserRouter , Route , Routes } from "react-router";
import Body from "./component/Body";
import Login from "./component/Login";
import Profile from "./component/Profile";
import Feed from "./component/Feed";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Connections from "./component/Connections";
import Requests from "./component/Requests";
import Chat from "./component/Chat";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/chat/:toUserId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
