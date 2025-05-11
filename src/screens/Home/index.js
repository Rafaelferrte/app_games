import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { theme, globalStyles } from '../../styles/theme';

const HomeScreen = ({ route, navigation }) => {
  const { user } = route.params || {};

  const popularGames = [
    {
      id: 1,
      title: 'Elden Ring',
      genre: 'RPG/Ação',
      image: 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png',
      rating: 5,
    },
    {
      id: 2,
      title: 'God of War: Ragnarök',
      genre: 'Ação/Aventura',
      image: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png',
      rating: 5,
    },
    {
      id: 3,
      title: 'The Legend of Zelda: Tears of the Kingdom',
      genre: 'Ação/Aventura',
      image: 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000063709/32b858e995a0345b7b1497fef5a1b59a3a94b9e3425b4b4a4e0e323a0c3e1d3f',
      rating: 4.5,
    },
  ];

  const newReleases = [
    {
      id: 4,
      title: 'Starfield',
      genre: 'RPG/Ficção Científica',
      image: 'https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/3098481c9164bb5f33069b37cad52cc1b4c17c11a0ace225.png',
      rating: 4,
    },
    {
      id: 5,
      title: 'Final Fantasy XVI',
      genre: 'RPG/Ação',
      image: 'https://image.api.playstation.com/vulcan/ap/rnd/202302/0222/98d01d9a955e4c9f5d2a9a7d3a1d0f2a1a1d0f2a1a1d0f2.png',
      rating: 4.5,
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={i <= rating ? styles.starFilled : styles.starEmpty}>
          {i <= rating ? '★' : '☆'}
        </Text>
      );
    }
    return <View style={globalStyles.flexRow}>{stars}</View>;
  };

  return (
    <SafeAreaView style={globalStyles.screenContainer}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bem-vindo, {user?.nome || 'Gamer'}!</Text>
          <Text style={styles.subtitle}>Descubra os melhores jogos</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Populares</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularGames.map((game) => (
              <TouchableOpacity
                key={game.id}
                style={styles.gameCard}
                onPress={() => navigation.navigate('GameDetails', { game })}
              >
                <Image source={{ uri: game.image }} style={styles.gameImage} />
                <View style={styles.gameInfo}>
                  <Text style={styles.gameTitle}>{game.title}</Text>
                  <Text style={styles.gameGenre}>{game.genre}</Text>
                  {renderStars(game.rating)}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lançamentos</Text>
          {newReleases.map((game) => (
            <TouchableOpacity
              key={game.id}
              style={styles.gameCardHorizontal}
              onPress={() => navigation.navigate('GameDetails', { game })}
            >
              <Image source={{ uri: game.image }} style={styles.gameImageHorizontal} />
              <View style={styles.gameInfoHorizontal}>
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.gameGenre}>{game.genre}</Text>
                {renderStars(game.rating)}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: theme.spacing.l,
    paddingBottom: theme.spacing.m,
  },
  welcomeText: {
    ...theme.typography.h2,
    color: theme.colors.onBackground,
  },
  subtitle: {
    ...theme.typography.body2,
    color: theme.colors.textDisabled,
    marginTop: theme.spacing.xs,
  },
  section: {
    marginTop: theme.spacing.l,
    paddingHorizontal: theme.spacing.m,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.onBackground,
    marginBottom: theme.spacing.m,
  },
  gameCard: {
    width: 200,
    marginRight: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.m,
    overflow: 'hidden',
    ...theme.elevation.low,
  },
  gameImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  gameInfo: {
    padding: theme.spacing.m,
  },
  gameTitle: {
    ...theme.typography.body1,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.xs,
  },
  gameGenre: {
    ...theme.typography.body2,
    color: theme.colors.textDisabled,
    marginBottom: theme.spacing.xs,
    textTransform: 'capitalize',
  },
  starFilled: {
    color: theme.colors.secondary,
    fontSize: 16,
  },
  starEmpty: {
    color: theme.colors.textDisabled,
    fontSize: 16,
  },
  gameCardHorizontal: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.m,
    overflow: 'hidden',
    marginBottom: theme.spacing.m,
    ...theme.elevation.low,
  },
  gameImageHorizontal: {
    width: 100,
    height: 120,
    resizeMode: 'cover',
  },
  gameInfoHorizontal: {
    flex: 1,
    padding: theme.spacing.m,
    justifyContent: 'center',
  },
});

export default HomeScreen;