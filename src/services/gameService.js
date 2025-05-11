const games = [
  {
    id: 1,
    title: 'Elden Ring',
    genre: 'RPG/Ação',
    image: 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png',
    rating: 5,
    description: 'Um jogo de RPG de ação em mundo aberto desenvolvido pela FromSoftware.'
  },
  {
    id: 2,
    title: 'God of War: Ragnarök',
    genre: 'Ação/Aventura',
    image: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png',
    rating: 5,
    description: 'A sequência da jornada de Kratos e Atreus pela mitologia nórdica.'
  }
];

export const GameService = {
  getFeaturedGames: async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(games);
      }, 800); // Simula delay de rede
    });
  },
  
  getGameById: async (id) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(games.find(game => game.id === id));
      }, 500);
    });
  }
};