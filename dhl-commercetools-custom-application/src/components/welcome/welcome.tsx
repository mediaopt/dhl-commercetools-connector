import type { ReactNode } from 'react';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import Constraints from '@commercetools-uikit/constraints';
import Grid from '@commercetools-uikit/grid';
import { AngleRightIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import Link from '@commercetools-uikit/link';
import messages from './messages';
import styles from './welcome.module.css';
import DHLLogo from './dhl-logo.png';

type TWrapWithProps = {
  children: ReactNode;
  condition: boolean;
  wrapper: (children: ReactNode) => ReactNode;
};
const WrapWith = (props: TWrapWithProps) => (
  <>{props.condition ? props.wrapper(props.children) : props.children}</>
);
WrapWith.displayName = 'WrapWith';

type TInfoCardProps = {
  title: string;
  content: string;
  linkTo: string;
  isExternal?: boolean;
};

const InfoCard = (props: TInfoCardProps) => (
  <Grid.Item>
    <div className={styles.infoCard}>
      <Spacings.Stack scale="m" alignItems="stretch">
        <Text.Headline as="h3">
          <WrapWith
            condition={true}
            wrapper={(children) =>
              props.isExternal ? (
                <a
                  className={styles.infoCardLink}
                  href={props.linkTo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ) : (
                <RouterLink className={styles.infoCardLink} to={props.linkTo}>
                  {children}
                </RouterLink>
              )
            }
          >
            <Spacings.Inline
              scale="s"
              alignItems="center"
              justifyContent="space-between"
            >
              <span>{props.title}</span>
              <AngleRightIcon size="big" color="primary" />
            </Spacings.Inline>
          </WrapWith>
        </Text.Headline>
        <Text.Body>{props.content}</Text.Body>
      </Spacings.Stack>
    </div>
  </Grid.Item>
);
InfoCard.displayName = 'InfoCard';

const Welcome = () => {
  const match = useRouteMatch();
  const intl = useIntl();

  return (
    <Constraints.Horizontal max="scale">
      <Grid display="grid" gridGap="16px" gridAutoColumns="480px">
        <Grid.Item>
          <Text.Headline as="h1" intlMessage={messages.title} />
        </Grid.Item>
        <Grid.Item>
          <div className={styles.imageContainer}>
            <img alt="dhl logo" src={DHLLogo} width="100%" height="100%" />
          </div>
        </Grid.Item>

        <Grid.Item>
          <Text.Detail>
            <FormattedMessage
              id="Welcome.newCustomerRegistration"
              values={{
                link: (
                  <Link
                    isExternal={true}
                    to={'https://geschaeftskunden.dhl.de/'}
                  >
                    <br />
                    <FormattedMessage id="Welcome.newCustomerRegistrationLink" />
                  </Link>
                ),
              }}
            />
          </Text.Detail>
        </Grid.Item>

        <InfoCard
          title={intl.formatMessage(messages.cardSettingsTitle)}
          content={intl.formatMessage(messages.cardSettingsContent)}
          linkTo={`${match.url}/settings/address`}
        />
        <InfoCard
          title={intl.formatMessage(messages.cardShippingSettingsTitle)}
          content={intl.formatMessage(messages.cardShippingSettingsContent)}
          linkTo={`${match.url}/settings/shipments`}
        />
      </Grid>
    </Constraints.Horizontal>
  );
};
Welcome.displayName = 'Welcome';

export default Welcome;
