import React from "react";
import "./DashboardContent.scss";

const DashboardContent = () => {
  return (
    <div>
      <section className="statistics">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="box">
                <i className="fa fa-user fa-fw bg-primary" />
                <div className="info">
                  <h3>1,245</h3> <span>Users</span>
                  <p>all the user are awesome</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box">
                <i className="fa fa-file fa-fw bg-danger" />
                <div className="info">
                  <h3>34</h3> <span>Projects</span>
                  <p>Lorem ipsum dolor sit amet</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box">
                <i className="fa fa-users fa-fw bg-success" />
                <div className="info">
                  <h3>5,245</h3> <span>Products</span>
                  <p>Products should be great </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardContent;
