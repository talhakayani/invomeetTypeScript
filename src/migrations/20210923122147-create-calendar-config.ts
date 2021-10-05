'use strict';
export = {
  up: async (queryInterface: any, DataTypes: any) => {
    await queryInterface.createTable('calendar_configs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      token: {
        type: DataTypes.STRING(10000),
        allowNull: false,
        unique: true,
      },
      calendarId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface: any) => {
    await queryInterface.dropTable('calendar_configs');
  },
};
