import React from 'react';
import { Button } from './Button';

export const PageNav = (props) => {
  return (
    <div id="pageNav">
      <div id="btnContainer">
        <Button
          id="prevBtn"
          value="Prev"
          onClick={props.handlePrev}
          page={props.page}
          shouldDisplay={props.page > 1}
          />
        <Button
          id="nextBtn"
          value="Next"
          onClick={props.handleNext}
          page={props.page}
          shouldDisplay={props.page < 20}
        />
      </div>
    </div>
  );
}
