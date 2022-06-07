import React from "react";
import { Link } from "react-router-dom";

function Home () {
    return (
        <Link to="dashboard/product">Dashboard Product</Link>
    );
}

export default Home;