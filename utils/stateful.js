import React from 'react';

export default (comp, logic) => {
  const newComp = (props) => {
    const newProps = logic(props);
    return React.createElement(comp, newProps, newProps.children);
  };
  newComp.displayName = comp.displayName || comp.name;

  return newComp;
};
