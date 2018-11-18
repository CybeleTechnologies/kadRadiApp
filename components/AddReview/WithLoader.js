import React from 'react';
import Loader from '../CommonDumb/Loader';

const ppHOC = WrappedComponent => props => (
  props.data.loading ? <Loader /> : <WrappedComponent {...props} />
);

export default ppHOC;
