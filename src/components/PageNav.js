import React from 'react';
import { Button } from './Button';

export const PageNav = (props) => {
  return (
    <div id="pageNav">
      <Button
        id="prevBtn"
        value="Prev"
        onClick={props.handlePrev}
        page={props.page}
        disabled={props.page === 1}
        />
      <div>{props.page} / 10</div>
      <Button
        id="nextBtn"
        value="Next"
        onClick={props.handleNext}
        page={props.page}
        disabled={props.page === 10}
      />
    </div>
  );
}
