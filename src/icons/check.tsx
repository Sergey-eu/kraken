import React, { FC } from 'react';
import { SvgIcon } from '../components/common/svg-icon';

export const CheckIcon: FC<SvgIcon.Props> = (props) => {
  return (
    <SvgIcon.$ viewBox="0 0 288.941 288.941" {...props}>
      <path fill="currentColor" d="M285.377 46.368c-4.74-4.704-12.439-4.704-17.179 0L96.309 217.114 20.734 142.61c-4.74-4.704-12.439-4.704-17.179 0s-4.74 12.319 0 17.011l84.2 82.997c4.692 4.644 12.499 4.644 17.191 0l180.43-179.239a11.93 11.93 0 0 0 .001-17.011c-4.74-4.704 4.752 4.692 0 0z" />
    </SvgIcon.$>
  );
};
