const getProfile = async (req, res) => {
  try {
    res.json({
      message: "User profile fetched successfully",
      user: {
        id: req.user.id,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getProfile,
};