import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';

import { NetworkContext } from '../../NetworkProvider';
import { GlobalSettingsContext } from '../../GlobalSettingsProvider';
import { consts, device, texts } from '../../config';
import { Title, TitleContainer, TitleShadow } from '../Title';
import { TextList } from '../TextList';
import { getQuery } from '../../queries';
import { graphqlFetchPolicy, refreshTimeFor } from '../../helpers';

export const About = ({ navigation }) => {
  const [refreshTime, setRefreshTime] = useState();
  const { isConnected, isMainserverUp } = useContext(NetworkContext);
  const globalSettings = useContext(GlobalSettingsContext);

  useEffect(() => {
    const getRefreshTime = async () => {
      const time = await refreshTimeFor('publicJsonFile-homeAbout', consts.STATIC_CONTENT);

      setRefreshTime(time);
    };

    getRefreshTime();
  }, []);

  if (!refreshTime) return null;

  const fetchPolicy = graphqlFetchPolicy({ isConnected, isMainserverUp, refreshTime });
  const { sections = {} } = globalSettings;
  const { headlineAbout = texts.homeTitles.about } = sections;

  return (
    <Query
      query={getQuery('publicJsonFile')}
      variables={{ name: 'homeAbout' }}
      fetchPolicy={fetchPolicy}
    >
      {({ data, loading }) => {
        if (loading) return null;

        let publicJsonFileContent =
          data && data.publicJsonFile && JSON.parse(data.publicJsonFile.content);

        if (!publicJsonFileContent || !publicJsonFileContent.length) return null;

        return (
          <View>
            {!!headlineAbout && (
              <TitleContainer>
                <Title>{headlineAbout}</Title>
              </TitleContainer>
            )}
            {!!headlineAbout && device.platform === 'ios' && <TitleShadow />}
            <TextList navigation={navigation} data={publicJsonFileContent} noSubtitle />
          </View>
        );
      }}
    </Query>
  );
};

About.propTypes = {
  navigation: PropTypes.object.isRequired
};
