import NotificationCollection from "../Model/NotificationModal.js";

const NotificationData = async (req, res) => {
  try {
    let querystring = req.body;
    // console.log(querystring.querystring.remindertime);
    // let notification = {
    //  ,
    //   reminderTime: querystring.remindertime,

    //   userdays: req.body.userdays,
    //   rowid: req.body.rowid,
    //   updatestatus: req.body.updatestatus,
    //   expair: req.body.expaire,
    // };
    querystring.querystring.userId = global.user_id;
    // querystring.querystring.rowid = querystring.querystring.rowid;
    let data = new NotificationCollection(querystring.querystring);

    await data.save();

    return res
      .status(201)
      .json({ success: true, message: "reminder set Success " });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
};

export default NotificationData;
