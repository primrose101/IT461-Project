import React, { useEffect, useState } from "react";

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

    const [url, setUrl] = useState('/nowhere');
    const getData = async (url, options) => {
        setUrl(url);
        try {
            const response = await fetch(url, options);
            setData(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    // useEffect(() => {
    //     const controller = new AbortController();
    //     getData(url, {
    //         signal: controller.signal
    //     });
    //     return () => {
    //         controller.abort();
    //     }
    // }, []);

    const style1 = {
        'margin-left': 'auto',
        'margin-right': 'auto'
    };

    return (
        <div>
            <h2>Dashboard Products</h2>
            
            <table style={style1}>
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
                { data.map((d) => (
                    <tr>
                        { Object.entries(d).map(([key,value]) =>
                            <td>{ key!=='edit' ? value : <button>Edit</button> }</td>
                        ) }
                    </tr>
                )) }
            </table> 

            <button>Add Product</button>
        </div>
    );
}

export default DashboardProduct;