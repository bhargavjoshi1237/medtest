import React from 'react';

const MyComponent = ({product}) => {
  return (
    <div>
      <h1>Props Display</h1>
      <p>{JSON.stringify(product)}</p>
    </div>
  );
};

export default MyComponent;
