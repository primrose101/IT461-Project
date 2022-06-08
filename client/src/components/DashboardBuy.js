import React from "react";

function DashboardBuy () {
    return (
        <div>
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
                        <a className="btn btn-outline-info">Buy</a>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DashboardBuy;