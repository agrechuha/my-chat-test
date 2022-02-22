module.exports = {
  async up(db, client) {
    let rooms = [
      {
        name: 'cats',
        title: 'Котики'
      },
      {
        name: 'dogs',
        title: 'Собачки'
      },
      {
        name: 'job',
        title: 'Работа'
      },
      {
        name: 'flood',
        title: 'Флуд'
      },
      {
        name: 'renovation',
        title: 'Ремонт'
      },
      {
        name: 'leisure',
        title: 'Досуг'
      },
    ];

    await db.collection('rooms').insertMany(rooms);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
