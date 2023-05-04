import View from "./view.js"
import Store from './store.js'


const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "x-color",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "circle-color",
  },
];

function init() {
  const view = new View();
  const store = new Store('live t3-storage-key', players);

  store.addEventListener('statechange', () => {
    view.render(store.game, store.stats)
  })

  window.addEventListener('storage', () => {
    console.log('state changed from another tab');
    view.render(store.game, store.stats);
  })

  view.render(store.game, store.stats);

  view.bindGameResetEvent(event => {
    store.reset();

  });


  view.bindNewRoundEvent(event => {
    store.newRound();
  });

  view.bindPlayerMoveEvent(square => {
    console.log(square);

    const existingMove = store.game.moves.find(move => move.squareId === +square.id)

    if (existingMove) {
      return
    }

    // Advance to the next by pushing move to the moves array. 

    store.playerMove(+square.id)

  });

}

window.addEventListener('load', init)