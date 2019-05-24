import PropTypes from 'prop-types';
import React from 'react';
import { Button, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { HtmlView, Link, ListSubtitle, Logo, TopVisual } from '../components';
import { colors, texts } from '../config';

export class DetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const itemId = navigation.getParam('itemId', 0);

    return {
      title: `Detail #${itemId}`,
      headerLeft: (
        <Button
          title={texts.button.back}
          onPress={() => navigation.goBack()}
          color={Platform.OS === 'ios' ? colors.lightestText : colors.primary}
        />
      ),
      headerRight: (
        <View style={styles.rowContainer}>
          <Button
            title={texts.button.share}
            onPress={() => alert(texts.button.share)}
            color={Platform.OS === 'ios' ? colors.lightestText : colors.primary}
          />
          <Button
            title="="
            onPress={() => navigation.openDrawer()}
            color={Platform.OS === 'ios' ? colors.lightestText : colors.primary}
          />
        </View>
      )
    };
  };

  render() {
    const { navigation } = this.props;
    const notAvailable = navigation.getParam('notAvailable', '');
    const subtitle = navigation.getParam('subtitle', 'otherParam fallback');

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {!!notAvailable && <Text>{notAvailable}</Text>}
        <View style={styles.container}>
          <TopVisual />
          <Logo navigation={navigation} />
          {!!subtitle && <ListSubtitle>{subtitle}</ListSubtitle>}
          <HtmlView />
          <Link />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 10
  },
  rowContainer: {
    flexDirection: 'row'
  }
});

DetailScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
