import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  Text,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import NewsCard from '../../components/NewsCard';
import { GameService } from '../../services/gameService';
import { theme } from '../../styles/theme';

const FeedScreen = ({ navigation }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Usando useCallback para otimizar a função
  const loadGames = useCallback(async () => {
    try {
      setError(null);
      const featuredGames = await GameService.getFeaturedGames();
      setGames(featuredGames);
    } catch (err) {
      console.error('Failed to load games:', err);
      setError('Falha ao carregar os jogos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadGames();
  };

  useEffect(() => {
    loadGames();
  }, [loadGames]); // Adicionando loadGames como dependência

  const renderItem = useCallback(({ item }) => (
    <NewsCard 
      article={item}
      onPress={() => navigation.navigate('GameDetails', { game: item })}
    />
  ), [navigation]);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={loadGames}
        >
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>Nenhum jogo disponível</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.m,
  },
  listContent: {
    paddingVertical: theme.spacing.m,
    flexGrow: 1, // Adicionado para melhorar o comportamento da lista vazia
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.m,
  },
  errorText: {
    ...theme.typography.body1,
    color: theme.colors.error,
    marginBottom: theme.spacing.m,
    textAlign: 'center',
  },
  emptyText: {
    ...theme.typography.body1,
    color: theme.colors.textDisabled,
  },
  retryButton: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.m,
    ...theme.elevation.low,
  },
  retryText: {
    ...theme.typography.body1,
    color: theme.colors.onPrimary,
    fontWeight: '500',
  },
});

export default FeedScreen;