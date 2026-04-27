export const loginFormValidates = (input) => {
  const errors = {};

  if (!input.username.trim()) {
    errors.username = "El usuario es obligatorio";
  } else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
    errors.username = "El usuario solo puede contener letras y números";
  }

  if (!input.password.trim()) {
    errors.password = "La contraseña es obligatoria";
  } else if (input.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  } else if (!/[A-Z]/.test(input.password)) {
    errors.password = "La contraseña debe incluir al menos una mayúscula";
  } else if (!/[0-9]/.test(input.password)) {
    errors.password = "La contraseña debe incluir al menos un número";
  } else if (!/[^A-Za-z0-9]/.test(input.password)) {
    errors.password = "La contraseña debe incluir al menos un carácter especial";
  }

  return errors;
};


export const registerFormValidates = (input) => {
  const errors = {};

  if (!input.name.trim()) {
    errors.name = "El nombre es obligatorio";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(input.name)) {
    errors.name = "El nombre solo puede contener letras";
  }

  if (!input.email.trim()) {
    errors.email = "El email es obligatorio";
  } else if (!/^\S+@\S+\.\S+$/.test(input.email)) {
    errors.email = "Ingresá un email válido";
  }

  if (!input.birthDate) {
    errors.birthDate = "La fecha de nacimiento es obligatoria";
  } else {
    const today = new Date();
    const birthDate = new Date(input.birthDate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (age < 18 || (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
      errors.birthDate = "Debés ser mayor de 18 años";
    }
  }

  if (!input.nDni) {
    errors.nDni = "El DNI es obligatorio";
  } else if (!/^\d+$/.test(input.nDni)) {
    errors.nDni = "El DNI solo puede contener números";
  } else if (input.nDni.length < 7 || input.nDni.length > 8) {
    errors.nDni = "El DNI debe tener entre 7 y 8 dígitos";
  }

  if (!input.username.trim()) {
    errors.username = "El usuario es obligatorio";
  } else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
    errors.username = "El usuario solo puede contener letras y números";
  }

  if (!input.password.trim()) {
    errors.password = "La contraseña es obligatoria";
  } else if (input.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  } else if (!/[A-Z]/.test(input.password)) {
    errors.password = "La contraseña debe incluir al menos una mayúscula";
  } else if (!/[0-9]/.test(input.password)) {
    errors.password = "La contraseña debe incluir al menos un número";
  } else if (!/[^A-Za-z0-9]/.test(input.password)) {
    errors.password = "La contraseña debe incluir al menos un carácter especial";
  }

  if (!input.confirmPassword) {
    errors.confirmPassword = "Por favor confirmá tu contraseña";
  } else if (input.confirmPassword !== input.password) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
};


const isTimeValid = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  const totalMinutes = hour * 60 + minute;
  return totalMinutes >= 8 * 60 && totalMinutes < 18 * 60;
};


export const dateTimeValidates = (inputs) => {
  const errors = {};
  const { date, time } = inputs;

  const selectedDateTime = date && time ? new Date(`${date}T${time}`) : null;
  const now = new Date();
  const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  if (!date) {
    errors.date = "La fecha es obligatoria";
  } else if (selectedDateTime && selectedDateTime < now) {
    errors.date = "No podés seleccionar una fecha pasada";
  } else if (selectedDateTime && selectedDateTime < twentyFourHoursLater) {
    errors.date = "Debés seleccionar una fecha con al menos 24 horas de anticipación";
  } else if (selectedDateTime && (selectedDateTime.getDay() === 0 || selectedDateTime.getDay() === 6)) {
    errors.date = "No se pueden agendar turnos los fines de semana";
  }

  if (!time) {
    errors.time = "La hora es obligatoria";
  } else if (!isTimeValid(time)) {
    errors.time = "El horario debe estar entre las 8:00 y las 18:00";
  }

  return errors;
};
