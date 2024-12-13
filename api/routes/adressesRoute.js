const express = require("express");
const {
  addAdress,
  removeAdress,
  getLoggedUserAdresses,
} = require("../services/adressesService");
const { protect } = require("../services/authService");
const router = express.Router();

router.route("/").post(protect, addAdress).get(protect, getLoggedUserAdresses);
router.route("/:id").delete(protect, removeAdress);

module.exports = router;
