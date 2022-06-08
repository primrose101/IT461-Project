import React from "react";
import './bootstrap-4.0.0-dist/css/bootstrap.min.css'

function Nav () {
    return (
        <nav class="col-3">
            <img src={require("./images/logoTS.png")} alt="homepage" class="dark-logo" width="60px" height="65" />
            <img src={require("./images/text-logoTS.png")} alt="homepage" class="dark-logo" style={{"margin-left": "0px", "padding": "0px"}} width="150px" height="80" />
        </nav>
    );
}

export default Nav;