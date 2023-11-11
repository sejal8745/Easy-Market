import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/Auth";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"User - EasyMarket"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 mt-3">
            <div className="card w-75 p-3">
              <h6>User Name: {auth?.user?.name}</h6>
              <h6>User Email: {auth?.user?.email}</h6>
              <h6>User Phone: {auth?.user?.phone}</h6>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
