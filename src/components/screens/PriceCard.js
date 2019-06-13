import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/native';

import { device, normalize } from '../../config';
import { DiagonalGradient, WrapperPrice } from '../../components';
import { PriceText } from '../Text';
import { priceFormat } from '../../helpers';

const PreiceBox = styled.View`
  background-color: rgba(15, 70, 24, 0.6);
  flex-direction: column;
  margin-bottom: ${normalize(14)};
  padding: ${normalize(7)}px;
  width: ${device.width * 0.5 - normalize(14) * 1.5};
`;

// TODO: add missing data and format amounts
export const PriceCard = ({ prices }) => (
  <DiagonalGradient style={{ padding: normalize(14) }}>
    <WrapperPrice>
      {!!prices &&
        prices.map((item, index) => {
          const {
            name,
            ageFrom,
            ageTo,
            category,
            amount,
            description,
            maxChildrenCount,
            maxAdultCount,
            minAdultCount,
            minChildrenCount,
            groupPrice
          } = item;

          return (
            <PreiceBox key={index}>
              {!!category && <PriceText bold>{category}</PriceText>}
              {!!amount && <PriceText bold>{priceFormat(amount)}</PriceText>}
              {!!groupPrice && <PriceText bold>{priceFormat(groupPrice)}</PriceText>}
              {!!description && <PriceText>{description}</PriceText>}
              {!!maxAdultCount && <PriceText>{maxAdultCount} Erwachsene</PriceText>}
              {!!maxChildrenCount && <PriceText>{maxChildrenCount} Kinder</PriceText>}
            </PreiceBox>
          );
        })}
    </WrapperPrice>
  </DiagonalGradient>
);

PriceCard.propTypes = {
  prices: PropTypes.array
};
