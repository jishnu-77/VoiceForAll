import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../utils/translations';

const LANGUAGES = [
  { code: 'english',   label: 'English',        nativeLabel: 'English',        flag: '🇬🇧' },
  { code: 'hindi',     label: 'Hindi',          nativeLabel: 'हिंदी',          flag: '🇮🇳' },
  { code: 'malayalam', label: 'Malayalam',      nativeLabel: 'മലയാളം',        flag: '🇮🇳' },
  { code: 'marathi',   label: 'Marathi',        nativeLabel: 'मराठी',          flag: '🇮🇳' },
  { code: 'tamil',     label: 'Tamil',          nativeLabel: 'தமிழ்',          flag: '🇮🇳' },
  { code: 'telugu',    label: 'Telugu',         nativeLabel: 'తెలుగు',         flag: '🇮🇳' },
  { code: 'bengali',   label: 'Bengali',        nativeLabel: 'বাংলা',          flag: '🇮🇳' },
];

type Props = {
  visible: boolean;
  onClose: () => void;
};

function LanguageSelector({ visible, onClose }: Props): React.JSX.Element {
  const { language, setLanguage, t } = useLanguage();

  const handleSelect = (code: Language) => {
    setLanguage(code);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{t.selectLanguage}</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              accessibilityLabel="Close language selector"
              accessibilityRole="button"
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Language List */}
          <FlatList
            data={LANGUAGES}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => {
              const isSelected = language === item.code;
              return (
                <TouchableOpacity
                  style={[
                    styles.languageItem,
                    isSelected && styles.selectedItem,
                  ]}
                  onPress={() => handleSelect(item.code as Language)}
                  accessibilityRole="button"
                  accessibilityLabel={`${item.label} - ${item.nativeLabel}`}
                  accessibilityState={{ selected: isSelected }}
                >
                  <Text style={styles.flag}>{item.flag}</Text>
                  <View style={styles.labelContainer}>
                    <Text style={[
                      styles.languageLabel,
                      isSelected && styles.selectedText,
                    ]}>
                      {item.nativeLabel}
                    </Text>
                    <Text style={styles.languageSubLabel}>{item.label}</Text>
                  </View>
                  {isSelected && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              );
            }}
          />

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 30,
    maxHeight: '75%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: '#666',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  selectedItem: {
    backgroundColor: '#E3F2FD',
  },
  flag: {
    fontSize: 28,
    marginRight: 16,
  },
  labelContainer: {
    flex: 1,
  },
  languageLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  selectedText: {
    color: '#2196F3',
  },
  languageSubLabel: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  checkmark: {
    fontSize: 20,
    color: '#2196F3',
    fontWeight: 'bold',
  },
});

export default LanguageSelector;