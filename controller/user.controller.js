const { Sequelize } = require("sequelize");
const user = require("../db/models/user");

const getAllUser = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const users = await user.findAndCountAll({
      where: {
        userType: {
          [Sequelize.Op.ne]: "0",
        },
      },
      offset,
      limit,
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json({
      status: "success",
      data: users.rows,
      totalResults: users.count,
      currentPage: page,
      totalPages: Math.ceil(users.count / limit),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUser };
