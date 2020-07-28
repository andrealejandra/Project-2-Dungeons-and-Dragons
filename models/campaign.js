const { sequelize } = require(".");
const { DataTypes } = require("sequelize/types");

module.exports = function (sequelize, DataTypes) {
    const Campaign = sequelize.define("Campaign", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        campaignSummery: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Campaign.associate = function(models) {
        Campaign.hasMany(models.Character, {
            onDelete: "casecade"
        });
        Campaign.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
};