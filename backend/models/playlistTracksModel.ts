import Sequelize, { Model, ModelStatic, Sequelize as sequelizeType } from 'sequelize';

export default (sequelize: sequelizeType) => {
  const playlistTrackModel: ModelStatic<Model> = sequelize.define(
    'playlist_track',
    {
      playlist_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      tracks_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
    },
    {
      createdAt: false,

      updatedAt: false,
    },
  );

  return playlistTrackModel;
};
