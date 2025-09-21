"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelStatusAppService = exports.registerAppService = exports.getAppByIdService = exports.getAppService = void 0;
const appointmentInterface_1 = require("../interfaces/appointmentInterface");
const userService_1 = require("./userService");
const Appointment_repository_1 = require("../repositories/Appointment.repository");
const getAppService = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentsFound = yield Appointment_repository_1.AppointmentModel.find();
    if (appointmentsFound.length > 0)
        return appointmentsFound;
    throw new Error("No hay turnos registrados.");
});
exports.getAppService = getAppService;
const getAppByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appFound = yield Appointment_repository_1.AppointmentModel.findOne({ where: { id: id } });
    if (!appFound)
        throw new Error("La cita con id ${id} no fue encontrada.");
    return appFound;
});
exports.getAppByIdService = getAppByIdService;
const registerAppService = (app) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, userService_1.getUserByIdService)(app.userId);
    Appointment_repository_1.AppointmentModel.validateAllowAppointment(app.date, app.time);
    yield Appointment_repository_1.AppointmentModel.validateExistingApp(app.userId, app.date, app.time);
    const newApp = Appointment_repository_1.AppointmentModel.create({
        date: app.date,
        time: app.time,
        user: { id: app.userId },
    });
    return yield Appointment_repository_1.AppointmentModel.save(newApp);
});
exports.registerAppService = registerAppService;
const cancelStatusAppService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appFound = yield Appointment_repository_1.AppointmentModel.findOne({ where: { id: id } });
    if (!appFound)
        throw new Error("La cita con id ${id} no fue encontrada.");
    appFound.status = appointmentInterface_1.Status.cancelled;
    yield Appointment_repository_1.AppointmentModel.save(appFound);
});
exports.cancelStatusAppService = cancelStatusAppService;
