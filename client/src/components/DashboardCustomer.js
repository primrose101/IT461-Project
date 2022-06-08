import React, { useEffect, useState } from "react";
import {helmet} from "react-helmet"

function DashboardCustomer () {

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

   // const style1 = {
     //   'margin-left': 'auto',
      //  'margin-right': 'auto'
    //};

    return (
        <div><h1>Hello World</h1></div>
    
    );
}
export default DashboardCustomer;