import React from 'react';
import { styled } from 'styled-components';
import { Orbit } from '@uiball/loaders';

const LoadingLayout = styled('div')`
  width: 100%;
  height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function LoadingBar() {
  return (
    <LoadingLayout>
      <div className="preloader">
        <div className="text">LOADING ... SUNGHA WORKING</div>
      </div>
    </LoadingLayout>
  );
}
export default LoadingBar;
