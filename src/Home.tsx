import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Countries from '../src/Countries';

export default () => (
  <Paper className="Muipaper">
    <Table className="Simpletable">
      <TableHead>
        <TableRow>
          <TableCell>position</TableCell>
          <TableCell>name</TableCell>
          <TableCell>percentage</TableCell>
          <TableCell>population</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Countries.map(row => (
          <TableRow key={row.name}>
            <TableCell>
              {Number(row.position) % 2 ? row.position : ''}
            </TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.percentage}</TableCell>
            <TableCell>{row.population}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);
