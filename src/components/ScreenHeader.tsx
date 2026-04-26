import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';

type Props = {
  title: string;
  subtitle: string;
  emoji: string;
  accentColor: string;
  backLabel: string;
  onBack: () => void;
};

function ScreenHeader({
  title,
  subtitle,
  emoji,
  accentColor,
  backLabel,
  onBack,
}: Props): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode ? '#FFF' : '#000';
  const subtitleColor = isDarkMode ? '#AAA' : '#666';

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack}>
        <Text style={[styles.back, { color: accentColor }]}>
          ← {backLabel}
        </Text>
      </TouchableOpacity>

      <View style={styles.center}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: subtitleColor }]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20 },
  back: { fontSize: 16, marginBottom: 10 },
  center: { alignItems: 'center' },
  emoji: { fontSize: 50 },
  title: { fontSize: 28, fontWeight: 'bold' },
  subtitle: { fontSize: 14 },
});

export default ScreenHeader;