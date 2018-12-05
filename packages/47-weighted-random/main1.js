window.onload = () => {
  const
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  const prizes = [
    { name: 'gold', chance: 9 },
    { name: 'food', chance: 3 },
    { name: 'poison', chance: 9 },
    { name: 'chest', chance: 3 },
  ];


  const results = [];
  for (let i = 0; i < 100; i++) {
    results.push(getPrize(Math.random()));
  }

  console.log(_.groupBy(results));

  function getPrize(rand) {
    let total = rand * prizes.reduce((prev, next) => prev + next.chance, 0);

    for (const prize of prizes) {
      if (total < prize.chance) {
        return prize.name;
      }
      total -= prize.chance;
    }
  }
};
