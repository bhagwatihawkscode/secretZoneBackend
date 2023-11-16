import express from "express";
import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();

import register from "../Controller/userController.js";
import logins from "../Controller/LoginController.js";
import AuthVerifys from "../Middleware/Auth.js";
import uploadFile from "../Controller/UpdateProfile.js";
import TodoData from "../Controller/TodoDataController.js";
import DataSend from "../Controller/DataController.js";
import ShowTable from "../Controller/TableShow.js";
import DeleteUser from "../Controller/DeleteController.js";
import EditData from "../Controller/EditDataController.js";
import UpdateTodo from "../Controller/UpdateEditController.js";
import favUpdat from "../Controller/FavListController.js";
import findPrivcyPass from "../Controller/checkfirstpass.js";
import FavfilterAndSearch from "../Controller/FavTableData.js";
import TotalAndTodayCount from "../Controller/DashCountController.js";
import filterAndSearch from "../Controller/DateFilterController.js";
import passkeyupdate from "../Controller/passkeyupdate.js";
import passverify from "../Controller/PasskeySuccesController.js";
import UnlockFully from "../Controller/premanentUnlockCOn.js";
import NotificationData from "../Controller/NotificationController.js";
import shownotifiction from "../Controller/notificationShow.js";
import shownotifictiondata from "../Controller/checkforNotification.js";
import ClearNotification from "../Controller/ClearNotificationController.js";
import openEditModal from "../Controller/checkforEditModalOpen.js";
const app = Router();

app.post("/register", register);
app.post("/login", logins);
app.post("/DataSend", AuthVerifys, DataSend);
app.post("/update", AuthVerifys, uploadFile);
app.post("/TodoData", AuthVerifys, TodoData);
app.post("/ShowTable", AuthVerifys, ShowTable);
app.post("/DeleteUser", AuthVerifys, DeleteUser);
app.post("/EditData", AuthVerifys, EditData);
app.post("/UpdateTodo", AuthVerifys, UpdateTodo);
app.post("/favUpdat", AuthVerifys, favUpdat);
app.post("/SearchFilter", AuthVerifys, filterAndSearch);
app.post("/FavSearchFilter", AuthVerifys, FavfilterAndSearch);
app.post("/DashboardApi", AuthVerifys, TotalAndTodayCount);
app.post("/checkPassGen", AuthVerifys, findPrivcyPass);
// app.post("/GeneratePass", AuthVerifys, passkeyupdate);
// app.post("/PasswordVerify", AuthVerifys, passverify);
// app.post("/PermanentUnlock", AuthVerifys, UnlockFully);
app.post("/setReminder", AuthVerifys, NotificationData);
app.post("/ShowNotification", AuthVerifys, shownotifiction);
app.post("/CheckDays", AuthVerifys, shownotifictiondata);
app.post("/ClearNotification", AuthVerifys, ClearNotification);
app.post("/openEditModal", AuthVerifys, openEditModal);
export default app;
