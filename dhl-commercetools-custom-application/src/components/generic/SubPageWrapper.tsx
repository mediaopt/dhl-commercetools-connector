import React, { FC } from 'react';
import Spacings from '@commercetools-uikit/spacings';
import SaveButton from './SaveButton';

const SubPageWrapper: FC<React.PropsWithChildren<any>> = ({ children }) => {
  return (
    <Spacings.Stack alignItems="stretch" scale="xl">
      <Spacings.Stack scale="xl" alignItems="stretch">
        {children}
      </Spacings.Stack>
      <SaveButton />
    </Spacings.Stack>
  );
};

export default SubPageWrapper;
