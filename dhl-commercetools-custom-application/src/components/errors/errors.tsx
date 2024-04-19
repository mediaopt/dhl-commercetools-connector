import { ReactNode } from 'react';
import DataTable, { TColumn } from '@commercetools-uikit/data-table';
import { WarningIcon, InfoIcon, SupportIcon } from '@commercetools-uikit/icons';
import Text from '@commercetools-uikit/text';
import { DHLError, OnlySettingsSubPageType } from '../../types/types';
import { FormattedMessage } from 'react-intl';

type row = DHLError;

type column = {
  key: string;
  label: string;
  width?: string;
};

const Errors = ({ values }: OnlySettingsSubPageType) => {
  const rows: DHLError[] = values.errors || [];
  const columns: column[] = [
    { key: 'level', label: 'Level', width: '1fr' },
    { key: 'timestamp', label: 'Time', width: '2fr' },
    { key: 'message', label: 'Message', width: '6fr' },
  ];

  const renderer = (row: row, column: TColumn<row>): ReactNode => {
    switch (column.key) {
      case 'timestamp':
        return <span>{new Date(row.timestamp).toISOString()}</span>;
      case 'level':
        if (row[column.key] === 'warning') {
          return <InfoIcon color="warning" />;
        } else if (row[column.key] === 'error') {
          return <WarningIcon color="error" />;
        }
        return <SupportIcon color="neutral60" />;
      default:
        // @ts-ignore
        return <span>{row[column.key]}</span>;
    }
  };

  if (!values.errors || values.errors.length === 0)
    return (
      <>
        <Text.Body>
          <FormattedMessage id="Settings.errorsEmpty" />
        </Text.Body>
      </>
    );

  return (
    <>
      <DataTable
        wrapHeaderLabels={false}
        itemRenderer={renderer}
        rows={rows}
        columns={columns}
      />
    </>
  );
};

export default Errors;
