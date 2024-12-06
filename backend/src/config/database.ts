import { Sequelize } from 'sequelize';

import playlistModel from '../models/playlist-model';
import playlistTrackModel from '../models/playlist-tracks-model';
import trackModel from '../models/track-model';
import userFollowersModel from '../models/user-followers-model';
import userFollowingModel from '../models/user-following-model';
import userModel from '../models/user-model';

import type { Idb } from '../interfaces/database-interface';
const POSTGRESDATABASE = `${process.env.POSTGRESDATABASE}`;
const POSTGRESUSER = `${process.env.POSTGRESUSER}`;
const POSTGRESPASSWORD = `${process.env.POSTGRESPASSWORD}`;

const sequelize = new Sequelize(POSTGRESDATABASE, POSTGRESUSER, POSTGRESPASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});
const database: Idb = {
  sequelize,
  playlistModel: playlistModel(sequelize),
  playlistTrackModel: playlistTrackModel(sequelize),
  trackModel: trackModel(sequelize),
  userModel: userModel(sequelize),
  userFollowersModel: userFollowersModel(sequelize),
  userFollowingModel: userFollowingModel(sequelize),
};

database.playlistModel.belongsToMany(database.trackModel, {
  through: database.playlistTrackModel,
  foreignKey: 'playlist_id',
  otherKey: 'track_id',
});
database.trackModel.belongsToMany(database.playlistModel, {
  through: database.playlistTrackModel,
  foreignKey: 'track_id',
  otherKey: 'playlist_id',
});
database.userModel.hasOne(database.userFollowersModel, { foreignKey: 'id' });
database.userFollowersModel.belongsTo(database.userModel, { foreignKey: 'id' });

// Связь между User и UsersFollowing
database.userModel.hasOne(database.userFollowingModel, { foreignKey: 'id' });
database.userFollowingModel.belongsTo(database.userModel, { foreignKey: 'id' });

// Связь между User и Playlist
database.userModel.hasMany(database.playlistModel, { foreignKey: 'owner' });
database.playlistModel.belongsTo(database.userModel, { foreignKey: 'owner' });

// Связь между User и Track
database.userModel.hasMany(database.trackModel, { foreignKey: 'artist' });
database.trackModel.belongsTo(database.userModel, { foreignKey: 'artist' });
// playlistModel(sequelize, )
// playlistTrackModel(sequelize, )
// trackModel(sequelize, )
// userModel(sequelize, )
// userFollowersModel(sequelize, )
// userFollowingModel(sequelize, )
const sequelizeSync = async () => {
  await sequelize.sync();
};
sequelizeSync();
export default database;
