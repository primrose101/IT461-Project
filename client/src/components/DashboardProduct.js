import React, { useEffect, useState } from "react";
import Aside from "./Aside";
import '../bootstrap-4.0.0-dist/css/bootstrap.min.css'
import axios from "axios";

function DashboardProduct () {

    const [data, setData] = useState([
        {
            'id': 'a', 
            'date': 'b', 
            'category': 'c',
            'brand': 'd',
            'name': 'e',
            'size': 'f',
            'price': 'g',
            'stocks': 'h',
            'photos': 'i',
            'edit': 'j'
        },
        {
            'id': 'h', 
            'date': 'i', 
            'category': 'j',
            'brand': 'k',
            'name': 'l',
            'size': 'm',
            'price': 'n',
            'stocks': 'o',
            'photos': 'p',
            'edit': 'q'
        }
    ]);

    const [url, setUrl] = useState('dashboard/v1/products');
    const getData = async (url, options) => {
        setUrl(url);
        try {
            console.log("was here");
            const response = await axios.get(url, options);
            console.log(response.data)
            // setData(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        getData(url, {
            signal: controller.signal,
            crossDomain: true,
            headers: {
            	"Access-Control-Allow-Origin": "*"
            }
        });
        return () => {
            controller.abort();
        }
    }, []);

    return (
        <div>
            <h2>Dashboard Products</h2>
            <table class="table table-bordered table-hover">
                <thead class="bg-info text-white">
                    <tr>
                        <th>ID no.</th>
                        <th>Datestamp</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Stocks</th>
                        <th>Photos</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    { data.map((d) => (
                        <tr>
                            { Object.entries(d).map(([key,value]) =>
                                <td>{ key!=='edit' ? value : <button class="btn btn-warning">Edit</button> }</td>
                            ) }
                        </tr>
                    )) }
                </tbody>
            </table> 

            <button class="btn btn-primary">Add Product</button>
        </div>
    );
}

export default DashboardProduct;