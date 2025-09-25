export const loginFormValidates = (input) => {
  const errors = {};

  if (!input.username.trim()) {
    errors.username = "Username is required";
  } else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
    errors.username = "Username must contain only letters and numbers";
  }

  if (!input.password.trim()) {
    errors.password = "Password is required";
  } else if (input.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!/[A-Z]/.test(input.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(input.password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[^A-Za-z0-9]/.test(input.password)) {
    errors.password = "Password must contain at least one special character";
  }

  return errors;
};


export const registerFormValidates = (input) => {
  const errors = {};

  if (!input.name.trim()) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(input.name)) {
    errors.name = "Name must be a valid name";
  }

  if (!input.email.trim()) {
    errors.email = "Mail is required";
  } else if (!/^\S+@\S+\.\S+$/.test(input.email)) {
    errors.email = "Mail must be a valid email address";
  }

  if (!input.birthDate) {
    errors.birthDate = "BirthDate is required";
  } else {
    const today = new Date();
    const birthDate = new Date(input.birthDate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (
      age < 18 ||
      (age === 18 &&
        (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) {
      errors.birthDate = "User must be at least 18 years old";
    }
  }

  if (!input.nDni) {
    errors.nDni = "nDni is required";
  } else if (!/^\d+$/.test(input.nDni)) {
    errors.nDni = "nDni must contain only numbers";
  } else if (input.nDni.length < 7 || input.nDni.length > 8) {
    errors.nDni = "nDni must be between 7 and 8 digits long";
  }

  if (!input.username.trim()) {
    errors.username = "Username is required";
  } else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
    errors.username = "Username must contain only letters and numbers";
  }

  if (!input.password.trim()) {
    errors.password = "Password is required";
  } else if (input.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!/[A-Z]/.test(input.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(input.password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[^A-Za-z0-9]/.test(input.password)) {
    errors.password = "Password must contain at least one special character";
  }

  return errors;
};


// 🔹 Validar rango de horario permitido
const isTimeValid = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  const totalMinutes = hour * 60 + minute;
  const startTime = 8 * 60;  // 08:00
  const endTime = 18 * 60;   // 18:00

  return totalMinutes >= startTime && totalMinutes < endTime;
};


// 🔹 Validador de agendar turno
export const dateTimeValidates = (inputs) => {
  const errors = {};
  const { date, time } = inputs;

  // construir fecha/hora solo si existen ambos
  const selectedDateTime = date && time ? new Date(`${date}T${time}`) : null;
  const now = new Date();
  const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  if (!date) {
    errors.date = "La fecha es obligatoria";
  } else if (selectedDateTime && selectedDateTime < now) {
    errors.date = "No puedes seleccionar una fecha pasada";
  } else if (selectedDateTime && selectedDateTime < twentyFourHoursLater) {
    errors.date = "Debes seleccionar una fecha con al menos 24 horas de anticipación";
  } else if (selectedDateTime && (selectedDateTime.getDay() === 0 || selectedDateTime.getDay() === 6)) {
    errors.date = "No se pueden agendar turnos los fines de semana";
  }

  if (!time) {
    errors.time = "La hora es obligatoria";
  } else if (!isTimeValid(time)) {
    errors.time = "La hora debe estar entre las 8 AM y las 6 PM";
  }

  return errors;
};
