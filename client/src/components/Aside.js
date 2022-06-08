import React from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";

function Aside(param) {
    return (
        <aside className="row">
            <div className="col-3"></div>
            <div className="col-9">
                <br/>
                <br/>
                <Link to="/dashboard/customer" class={ param['active']==="customers" ? "btn btn-primary btn-lg btn-block" : "btn btn-outline-primary btn-lg btn-block" }>Customer</Link>
                <br/>
                <Link to="/dashboard/product" class={ param['active']==="products" ? "btn btn-primary btn-lg btn-block" : "btn btn-outline-primary btn-lg btn-block" }>Product</Link>
                <br />
                <Link to="/dashboard/buy" class={ param['active']==="buy" ? "btn btn-primary btn-lg btn-block" : "btn btn-outline-primary btn-lg btn-block" }>Buy</Link>
            </div>
        </aside>
    );
}

export default Aside;