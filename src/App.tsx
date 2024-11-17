import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import LoginPage from "./components/Loginpage";
import UserList from "./components/UserList";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header"; // Import the Header component
import { Layout } from "antd";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          {/* Include the Header component */}
          <Header />

          <Content style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/users"
                element={
                  <PrivateRoute>
                    <UserList />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
