import { PERMISSIONS } from "../constants.js";

const roleMiddleware = (req, res, next) => {
  const { user } = req;
  const endpoint = req.method + req.url;

  if (PERMISSIONS[user.role].includes(endpoint)) {
    next();
  } else {
    res.status(403).send("Not allowed");
  }
};

export default roleMiddleware;
