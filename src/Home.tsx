import * as React from "react";
import Countries from "../src/Countries";
import Country from "./Country";
import SimpleCard from "./SimpleCard";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default () => (
  <Paper className="Muipaper">
    <div style={{"display": "flex", "width": "100%"}}>
      <Countries style={{ "flex": "left", "width": "50%" }} />
      <Countries style={{ "float": "right", "width": "50%" }} />
    </div>
  </Paper>
);
