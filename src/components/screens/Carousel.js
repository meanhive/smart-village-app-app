import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Query } from 'react-apollo';
import _shuffle from 'lodash/shuffle';

import { NetworkContext } from '../../NetworkProvider';
import { colors, consts } from '../../config';
import { ImagesCarousel } from '../ImagesCarousel';
import { LoadingContainer } from '../LoadingContainer';
import { getQuery } from '../../queries';
import { graphqlFetchPolicy, refreshTimeFor } from '../../helpers';

export const Carousel = ({ navigation }) => {
  const [refreshTime, setRefreshTime] = useState();
  const { isConnected, isMainserverUp } = useContext(NetworkContext);

  useEffect(() => {
    const getRefreshTime = async () => {
      const time = await refreshTimeFor('publicJsonFile-homeCarousel', consts.STATIC_CONTENT);

      setRefreshTime(time);
    };

    getRefreshTime();
  }, []);

  if (!refreshTime) {
    return (
      <LoadingContainer>
        <ActivityIndicator color={colors.accent} />
      </LoadingContainer>
    );
  }

  const fetchPolicy = graphqlFetchPolicy({ isConnected, isMainserverUp, refreshTime });

  return (
    <Query
      query={getQuery('publicJsonFile')}
      variables={{ name: 'homeCarousel' }}
      fetchPolicy={fetchPolicy}
    >
      {({ data, loading }) => {
        if (loading) {
          return (
            <LoadingContainer>
              <ActivityIndicator color={colors.accent} />
            </LoadingContainer>
          );
        }

        let carouselImages = data && data.publicJsonFile && JSON.parse(data.publicJsonFile.content);

        if (!carouselImages) return null;

        return (
          <ImagesCarousel
            navigation={navigation}
            data={_shuffle(carouselImages)}
            fetchPolicy={fetchPolicy}
          />
        );
      }}
    </Query>
  );
};

Carousel.propTypes = {
  navigation: PropTypes.object.isRequired
};
