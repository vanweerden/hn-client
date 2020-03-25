import React from "react";

export const HaxMode = props => {
  const content = props.display ? 'h4x0r m0d3 eng4g3d!1' : '';
  return <div id='hax'>{content}</div>;
}
