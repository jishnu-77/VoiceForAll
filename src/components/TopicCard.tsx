import React from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  id: string;
  icon: string;
  title: string;
  description: string;
  accentColor: string;
  speakingId: string | null;
  onPress: () => void;
  onPlayPress?: () => void;
};

function TopicCard({
  id,
  icon,
  title,
  description,
  accentColor,
  speakingId,
  onPress,
  onPlayPress,
}: Props): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  const cardBg = isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#000';
  const subtitleColor = isDarkMode ? '#AAA' : '#666';

  const isPlaying = speakingId === id;

  // Detect emoji vs icon name
  const isEmoji = icon.length <= 2;

  return (
    <TouchableOpacity
      accessibilityLabel={title}
      accessibilityRole="button"
      activeOpacity={0.75}
      style={[
        styles.card,
        { backgroundColor: cardBg },
        isPlaying && { borderWidth: 2, borderColor: accentColor },
      ]}
      onPress={onPress}
    >

      {/* Icon */}
      <View style={[styles.iconContainer, { backgroundColor: accentColor + '22' }]}>
        {isEmoji ? (
          <Text style={styles.icon}>{icon}</Text>
        ) : (
          <Icon name={icon} size={24} color={accentColor} />
        )}
      </View>

      {/* Text */}
      <View style={styles.content}>
        <Text style={[styles.title, { color: textColor }]}>
          {title}
        </Text>

        <Text
          style={[styles.desc, { color: subtitleColor }]}
          numberOfLines={2}
        >
          {description}
        </Text>
      </View>

      {/* Play / Stop Button */}
      <TouchableWithoutFeedback
        onPress={(e) => {
          e.stopPropagation();
          onPlayPress?.();
        }}
      >
        <View>
          {isPlaying ? (
            <Icon name="stop-circle" size={28} color="#F44336" />
          ) : (
            <Icon name="play-circle" size={28} color={accentColor} />
          )}
        </View>
      </TouchableWithoutFeedback>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  icon: {
    fontSize: 26,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  desc: {
    fontSize: 13,
    marginTop: 2,
  },
});

export default TopicCard;