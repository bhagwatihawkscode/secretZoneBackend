import FileCollection from "../Model/FileModal.js";

const PrivcyOkOrNot = async (req, res) => {
  try {
    let childId = req.body.querystring;

    let userData = await FileCollection.findById(childId);
    if (userData.PassKeyGen === "" || !userData.PassKeyGen) {
      return res.status(200).json(true);
    } else if (userData.PassKeyGen) {
      let user = await FileCollection.findOneAndUpdate(
        { _id: childId },
        { PrivcyOK: "true" },
        { new: true }
      );

      if (user) {
        return res.status(200).json({
          statusCode: 201,
          message: "Successfully updated",
          data: user,
        });
      } else {
        return res.status(403).json({
          statusCode: 403,
          message: "Failed to update PassKey",
        });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default PrivcyOkOrNot;
