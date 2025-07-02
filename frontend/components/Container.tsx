import { View, ScrollView, StyleSheet } from 'react-native';

export default function Container({
  children,
  header,
  type = 'view',
  onLayoutRootView,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  type?: 'view' | 'scrollView';
  onLayoutRootView?: () => void;
}) {
  if (type === 'view') {
    return (
      <View style={styles.container} onLayout={onLayoutRootView}>
        <View style={styles.header}>{header}</View>
        <View style={styles.body}>{children}</View>
      </View>
    );
  } else {
    return (
      <ScrollView contentContainerStyle={styles.container} onLayout={onLayoutRootView}>
        <View style={styles.header}>{header}</View>
        <View style={styles.body}>{children}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#000',
    width: '100%',
    height: 60,
  },
  body: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
