import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import pages from "../pages";

const routes: JSX.Element = (
    <Router>
        <Switch>
            <Route exact={true} path="/" component={pages.FrontPage} />
        </Switch>
    </Router>
);

export default routes;
