'use strict';
import { Model } from 'sequelize';
export = (sequelize: any, DataTypes: any) => {
  class CalendarConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  CalendarConfig.init(
    {
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
        defaultValue: 'primary',
      },
    },
    {
      hooks: {
        /**
         *  Before CRUD operations hooks
         */
        beforeValidate(calendar_configs: any, options: any) {
          console.log(
            'Calendar Configration Before validate',
            calendar_configs,
            options
          );
        },
        beforeCreate(calendar_configs: any, options: any) {
          console.log(
            'Calendar Configration Before Create',
            calendar_configs,
            options
          );
        },

        beforeDestroy(calendar_configs: any, options: any) {
          console.log(
            'Calendar Configration Before Destroy',
            calendar_configs,
            options
          );
        },

        /**
         *  After CRUD operations hooks
         */
        afterValidate(calendar_configs: any, options: any) {
          console.log(
            'Calendar Configration After Validate',
            calendar_configs,
            options
          );
        },
        afterCreate(calendar_configs: any, options: any) {
          console.log(
            'Calendar Configration After Create',
            calendar_configs,
            options
          );
        },
        afterUpdate(calendar_configs: any, options: any) {
          console.log(
            'Calendar Configration After Update',
            calendar_configs,
            options
          );
        },
        afterDestroy(calendar_configs: any, options: any) {
          console.log(
            'Calendar Configration After Destroy',
            calendar_configs,
            options
          );
        },
      },
      sequelize,
      tableName: 'calendar_configs',
      modelName: 'CalendarConfig',
    }
  );
  return CalendarConfig;
};
