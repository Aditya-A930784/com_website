import React from 'react';
import { SafeAreaView, Platform, ActivityIndicator, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

// Default URL: Android emulator uses 10.0.2.2 to reach host localhost
const DEFAULT_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

export default function App() {
  // To override the URL in development, set REACT_NATIVE_URL in environment
  const url = (process.env.REACT_NATIVE_URL && process.env.REACT_NATIVE_URL) || DEFAULT_URL;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: url }}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        )}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
