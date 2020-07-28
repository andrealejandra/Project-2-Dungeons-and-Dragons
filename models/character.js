module.exports = function (sequelize, DataTypes) {
    const Character = sequelize.define("Character", {
        // Characters need to have a name, a class, a race, a brief bio
        // and then an optional subrace and subclass
        // a character belongs to a user and a campaign
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        class: {
            type: DataTypes.STRING,
            allowNull: false
        },
        race: {
            type: DataTypes.STRING,
            allowNull: false
        },
        subClass: {
            type: DataTypes.STRING
        },
        subRace: {
            type: DataTypes.STRING
        },
        briefBio: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        }
    });

    // Characters belong to campaigns

    Character.associate = function(models) {
        Character.belongsTo(models.Campaign, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Character;
};