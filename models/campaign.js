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
        Campaign.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Campaign.hasMany(models.Character, {
            onDelete: "cascade"
        });

      
    };

    return Campaign;
};