import PrimaryButton from '@commercetools-uikit/primary-button';
import Spacings from '@commercetools-uikit/spacings';

const SaveButton = () => {
  return (
    <Spacings.Inline
      scale="s"
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <PrimaryButton label="save" type="submit" />
    </Spacings.Inline>
  );
};

export default SaveButton;
