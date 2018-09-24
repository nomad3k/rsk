import sequelize from '../sequelize';

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
