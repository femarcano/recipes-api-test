export const getRecipeModel = (sequelize, { DataTypes }) => {
  const Recipe = sequelize.define('recipes', {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 100
      }
    },
    making_time: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 100
      }
    },
    serves: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 100
      }
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 300
      }
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true
      }
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  },{
    timestamps: false
  })
  return Recipe
}
