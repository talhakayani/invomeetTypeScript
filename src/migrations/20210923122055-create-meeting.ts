'use strict';
export = {
  up: async (queryInterface: any, DataTypes: any) => {
    await queryInterface.createTable('meetings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      reservedBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reservedWith: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reservedFrom: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      reservedTo: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      inProgress: {
        type: DataTypes.STRING,
        defaultValue: 'InProgress',
      },
      googleCalendarEventId: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true,
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'rooms',
          key: 'id',
        },
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
    await queryInterface.dropTable('meetings');
  },
};
