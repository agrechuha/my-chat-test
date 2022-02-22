module.exports = {
  async up(db, client) {
    let users = [
      {
        username: 'chatbot',
      },
      {
        username: 'vasya',
      },
      {
        username: 'petya',
      },
      {
        username: 'gosha',
      },
      {
        username: 'yurka',
      },
      {
        username: 'mishka',
      },
    ];

    await db.collection('users').insertMany(users);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
