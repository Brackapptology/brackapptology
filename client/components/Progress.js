import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const CircularProgressExampleSimple = () => (
  <div>
    <h3>Please be patient while we load bracket data</h3>
    <CircularProgress size={60} thickness={7} />
  </div>
);

export default CircularProgressExampleSimple;