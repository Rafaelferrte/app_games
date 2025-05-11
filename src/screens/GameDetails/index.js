import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { theme } from '../../styles/theme';

const GameDetails = ({ route }) => {
  const { game } = route.params;
  const [imgError, setImgError] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: imgError ?
            'https://via.placeholder.com/400x225.png?text=Game+Cover' :
            game.image
        }}
        style={styles.image}
        onError={() => setImgError(true)}
      />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.genre}>{game.genre}</Text>
        <Text style={styles.rating}>⭐ {game.rating}/5</Text>

        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={styles.description}>
          {game.description || 'Descrição detalhada do jogo não disponível.'}
        </Text>

        {/* Botão opcional para alguma ação */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    backgroundColor: theme.colors.textDisabled,
  },
  detailsContainer: {
    padding: theme.spacing.l,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    marginTop: -theme.radius.xl,
    ...theme.elevation.medium,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  genre: {
    ...theme.typography.body1,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.m,
    textTransform: 'capitalize',
  },
  rating: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginBottom: theme.spacing.l,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
    marginTop: theme.spacing.m,
  },
  description: {
    ...theme.typography.body1,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: theme.spacing.m,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
    borderRadius: theme.radius.m,
    alignItems: 'center',
    marginTop: theme.spacing.l,
    ...theme.elevation.low,
  },
  buttonText: {
    ...theme.typography.body1,
    color: theme.colors.onPrimary,
    fontWeight: '600',
  },
});

export default GameDetails;