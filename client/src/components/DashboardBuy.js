import React from "react";
import Aside from "./Aside";

function DashboardBuy () {
    return (
        <div className="row">
            <div className="col-3">
                <Aside/>
            </div>
            <div className="col-9">
                <h2>Dashboard Buy</h2>
                <table className="table table-bordered table-hover">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>Photos</th>
                            <th>Product</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Transaction</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr>
                            <td>Photos</td>
                            <td>Product</td>
                            <td>Description</td>
                            <td>Price</td>
                            <a href="/#" className="btn btn-outline-info">Buy</a>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DashboardBuy;