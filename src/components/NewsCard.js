import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

const NewsCard = ({ article, onPress }) => {

  const [imgError, setImgError] = useState(false);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{
          uri: imgError ?
            'https://via.placeholder.com/300x180.png?text=Game+Image' :
            article.image
        }}
        style={styles.image}
        onError={() => setImgError(true)} // 3. Atualiza o estado em caso de erro
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
        <View style={styles.footer}>
          <Text style={styles.genre}>{article.genre}</Text>
          <Text style={styles.rating}>⭐ {article.rating}/5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.m,
    marginBottom: theme.spacing.m,
    overflow: 'hidden',
    ...theme.elevation.medium,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: theme.colors.textDisabled,
  },
  content: {
    padding: theme.spacing.m,
  },
  title: {
    ...theme.typography.body1,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genre: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textTransform: 'capitalize',
  },
  rating: {
    ...theme.typography.body2,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default NewsCard;