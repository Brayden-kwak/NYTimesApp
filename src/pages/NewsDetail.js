import {View, StyleSheet} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';

const NewsDetail = ({route}) => {
  return (
    <View style={styles.container}>
      <WebView
        pullToRefreshEnabled={true}
        startInLoadingState={true}
        allowsBackForwardNavigationGestures={true}
        source={{
          uri: route.params.paramKey.web_url,
        }}
        originWhitelist={['https://*', 'http://*']}
        javaScriptEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NewsDetail;
