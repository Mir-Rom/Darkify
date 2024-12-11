import database from '../config/database.ts';

export default {
  async getUserInfo(userId: string) {
    const fullUserInfo = await database.userModel.findByPk(userId);
    if (fullUserInfo === null) {
      return new Error('User with this id does not exist');
    }
    const requiredUserInfo = {
      name: fullUserInfo.dataValues.name,
      avatar_id: fullUserInfo.dataValues.avatar_id,
      followers_id: fullUserInfo.dataValues.followers_id,
      following: fullUserInfo.dataValues.following,
    };
    return requiredUserInfo;
  },
};
