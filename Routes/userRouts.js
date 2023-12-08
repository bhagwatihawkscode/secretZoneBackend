import express from "express";
import { Router } from "express";
import dotenv from "dotenv";
import multer from "multer";

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
import sendmail from "../Controller/mailsendcontroller.js";
import whatsappshare from "../Controller/whatsappsendcontroller.js";
import FileData from "../Controller/fileController.js";
import FileFilter from "../Controller/FileShow.js";
import fileDeleteUser from "../Controller/FileDelete.js";
import filepassGenrate from "../Controller/filepassGenrate.js";
import Filepassverify from "../Controller/FilePassverify.js";
import FileLockRemove from "../Controller/FileRemoveLock.js";
import PrivcyOkOrNot from "../Controller/FileCheckPrivcy.js";
import DownloadZip from "../Controller/FileDownload.js";
import MailShareZip from "../Controller/FileEmailShare.js";
import WhatsappShareZip from "../Controller/FileWhatsappShare.js";
import FileEditData from "../Controller/FileEDITShow.js";
import FileUpdateData from "../Controller/FileEditController.js";
import WeekData from "../Controller/WeekDaysCount.js";
import ClockModalData from "../Controller/ClockModalApi.js";
import genratelinks from "../Controller/shareingpermission/SharePermissionLink.js";
import senddatawithPermission from "../Controller/shareingpermission/FilterGiveRow.js";
import getAllUser from "../Controller/shareingpermission/getAllUsers.js";
import LocationFilter from "../Controller/DashSerachByLocation.js";
import {
  forgotPassword,
  resetPassword,
} from "../Controller/ForgetPassControoler.js";

const app = Router();

app.post("/register", register);
app.post("/login", logins);
app.post("/forgot-password", forgotPassword);
// app.post("/reset-password/:token", getResetPasswordForm);
app.post("/reset-password/:token", resetPassword);

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
app.post("/GeneratePass", AuthVerifys, passkeyupdate);
app.post("/PasswordVerify", AuthVerifys, passverify);
app.post("/PermanentUnlock", AuthVerifys, UnlockFully);
app.post("/setReminder", AuthVerifys, NotificationData);
app.post("/ShowNotification", AuthVerifys, shownotifiction);
app.post("/CheckDays", AuthVerifys, shownotifictiondata);
app.post("/ClearNotification", AuthVerifys, ClearNotification);
app.post("/openEditModal", AuthVerifys, openEditModal);
app.post("/mailsend", AuthVerifys, sendmail);
app.post("/whatsappsend", AuthVerifys, whatsappshare);
app.post("/FileData", AuthVerifys, FileData);
app.post("/FileFilter", AuthVerifys, FileFilter);
app.post("/deleteuserfiles", AuthVerifys, fileDeleteUser);
app.post("/generatepassword", AuthVerifys, filepassGenrate);
app.post("/passwordverification", AuthVerifys, Filepassverify);
app.post("/removeLock", AuthVerifys, FileLockRemove);
app.post("/privacyokornot", AuthVerifys, PrivcyOkOrNot);
app.post("/downloadzip", DownloadZip);
app.post("/Emailsendzip", AuthVerifys, MailShareZip);
app.post("/Whatsappsendzip", AuthVerifys, WhatsappShareZip);
app.post("/editmodalshow", AuthVerifys, FileEditData);
app.post("/Fileupdatedata", AuthVerifys, FileUpdateData);
app.post("/weekdayscount", AuthVerifys, WeekData);
app.post("/clockmodaldatasend", AuthVerifys, ClockModalData);

app.post("/generatelink", AuthVerifys, genratelinks);
app.post("/sendrowdata/:id", AuthVerifys, senddatawithPermission);
app.post("/alluserslist", AuthVerifys, getAllUser);
app.post("/LocationFilter", AuthVerifys, LocationFilter);

export default app;
