import React from "react";

function Error404() {
  return (
    <div>
      {" "}
      <section className="not-found-page section-padding">
        <div className="container">
          <div className="row">
            <div
              className="col-md-8 mx-auto text-center  pt-4 pb-5"
              style={{ marginTop: "3rem" }}
            >
              <h1>Sorry! Page not found.</h1>
              <p className="land">Unfortunately You are not authentificated</p>
              <div className="mt-5">
                <a
                  style={{ backgroundColor: "#E6552D" }}
                  href="/login"
                  className="btn btn-success btn-lg"
                >
                  <i className="mdi mdi-home" /> GO TO LOGIN PAGE
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
    </div>
  );
}

export default Error404;
