import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  tapHint: string;
  onPress: () => void;
};

function CategoryCard({
  title,
  subtitle,
  icon,
  color,
  tapHint,
  onPress,
}: Props): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const cardBackground = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const subtitleColor = isDarkMode ? '#AAA' : '#666';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={[styles.card, { backgroundColor: cardBackground }]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Icon name={icon} size={40} color="#FFF" accessible={false} />
      </View>

      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: subtitleColor }]}>
        {subtitle}
      </Text>

      <Text style={styles.tapHint}>{tapHint}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '45%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 5,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  tapHint: {
    fontSize: 13,
    color: '#2196F3',
    fontWeight: '500',
  },
});

export default CategoryCard;