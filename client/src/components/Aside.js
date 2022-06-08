import React from "react";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";

function Aside() {
    return (
        <aside>
            <br/>
            <br/>
            <Link to="/dashboard/customer" class="btn btn-lg btn-block">Customer</Link>
            <br/>
            <Link to="/dashboard/product" class="btn btn-lg btn-block">Product</Link>
            <br />
            <Link to="/dashboard/buy" class="btn btn-lg btn-block">Buy</Link>
        </aside>
    );
}

export default Aside;