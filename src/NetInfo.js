import NetInfo from '@react-native-community/netinfo';

import appJson from '../app.json';
import { secrets } from './config';

const namespace = appJson.expo.slug;

// https://github.com/react-native-community/react-native-netinfo#netinfoconfiguration
NetInfo.configure({
  reachabilityUrl: `${secrets[namespace].serverUrl}/generate_204`,
  reachabilityTest: async (response) => response.status === 204,
  reachabilityLongTimeout: 60 * 1000, // 60s
  reachabilityShortTimeout: 15 * 1000, // 15s
  reachabilityRequestTimeout: 10 * 1000 // 10s
});

export default NetInfo;
