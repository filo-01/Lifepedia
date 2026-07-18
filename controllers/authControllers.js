const PenggunaModel = require("../models/Pengguna");
const bcrypt = require("bcrypt");

function validateRegister(nama, username, email, password) {
  const pesanError = [];

  if (!nama || nama.trim() === "") {
    pesanError.push("Nama tidak boleh kosong");
  } else if (nama.trim().length < 3) {
    pesanError.push("Nama harus terdiri dari minimal 3 karakter");
  }

  if (!username || username.trim() === "") {
    pesanError.push("Username tidak boleh kosong");
  } else if (!/^[a-zA-Z0-9._]+$/.test(username.trim())) {
    pesanError.push("Username hanya boleh mengandung huruf, angka, titik, dan underscore");
  }

  if (!email || email.trim() === "") {
    pesanError.push("Email tidak boleh kosong");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    pesanError.push("Format email tidak valid");
  }

  if (!password || password.trim() === "") {
    pesanError.push("Password tidak boleh kosong");
  } else if (password.trim().length < 6) {
    pesanError.push("Password harus terdiri dari minimal 6 karakter");
  }

  return pesanError;
}

function validateLogin(email, password) {
  const pesanError = [];

  if (!email || email.trim() === "") {
    pesanError.push("Email tidak boleh kosong");
  }

  if (!password || password.trim() === "") {
    pesanError.push("Password tidak boleh kosong");
  }

  return pesanError;
}

function showLoginForm(req, res) {
  return res.render("pages/auth/login", {
    session: req.session
  });
}

function showRegisterForm(req, res) {
  return res.render("pages/auth/register", {
    session: req.session
  });
}

async function register(req, res) {
  const { nama, username, email, password } = req.body;

  const pesanError = validateRegister(nama, username, email, password);

  if (pesanError.length > 0) {
    return res.render("pages/auth/register", {
      pesanError,
      formData: { nama, username, email },
      session: req.session
    });
  }

  const userAda = PenggunaModel.ambilPenggunaByEmail(email);

  if (userAda) {
    return res.render("pages/auth/register", {
      pesanError: ["Email sudah terdaftar, silakan gunakan email lain"],
      formData: { nama, username, email },
      session: req.session
    });
  }

  let foto_profil = "default.jpg";

  if (req.file) {
    foto_profil = req.file.filename;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  PenggunaModel.buatPengguna(
    nama,
    username,
    email,
    hashedPassword,
    foto_profil,
    "Halo, saya menggunakan Lifepedia."
  );

  return res.redirect("/auth/login");
}

async function login(req, res) {
  const { email, password } = req.body;

  const pesanError = validateLogin(email, password);

  if (pesanError.length > 0) {
    return res.render("pages/auth/login", {
      pesanError,
      formData: { email },
      session: req.session
    });
  }

  const pengguna = PenggunaModel.ambilPenggunaByEmail(email);

  if (!pengguna) {
    return res.render("pages/auth/login", {
      pesanError: ["Email atau password salah"],
      formData: { email },
      session: req.session
    });
  }

  const passwordCocok = await bcrypt.compare(password, pengguna.password);

  if (!passwordCocok) {
    return res.render("pages/auth/login", {
      pesanError: ["Email atau password salah"],
      formData: { email },
      session: req.session
    });
  }

  req.session.penggunaId = pengguna.id;
  req.session.username = pengguna.username;
  req.session.email = pengguna.email;
  req.session.peran = "user";

  return res.redirect("/");
}

function logout(req, res) {
  req.session.destroy(function () {
    res.redirect("/auth/login");
  });
}

function showForgotPasswordForm(req, res) {
  return res.render("pages/auth/forgot-password", {
    session: req.session
  });
}

function forgotPassword(req, res) {
  const { email } = req.body;

  if (!email || email.trim() === "") {
    return res.render("pages/auth/forgot-password", {
      pesanError: ["Email tidak boleh kosong"],
      session: req.session
    });
  }

  return res.render("pages/auth/forgot-password", {
    pesanSukses: "Fitur reset password belum diimplementasikan.",
    session: req.session
  });
}

function showResetPasswordForm(req, res) {
  return res.render("pages/auth/reset-password", {
    token: req.params.token,
    session: req.session
  });
}

async function resetPassword(req, res) {
  const { token, password, confirmPassword } = req.body;

  const pesanError = [];

  if (!password) pesanError.push("Password tidak boleh kosong");
  if (!confirmPassword) pesanError.push("Konfirmasi password tidak boleh kosong");
  if (password !== confirmPassword) pesanError.push("Konfirmasi password tidak cocok");

  if (pesanError.length > 0) {
    return res.render("pages/auth/reset-password", {
      pesanError,
      token,
      session: req.session
    });
  }

  return res.render("pages/auth/reset-password", {
    pesanSukses: "Fitur reset password belum diimplementasikan.",
    token,
    session: req.session
  });
}

module.exports = {
  showLoginForm,
  showRegisterForm,
  register,
  login,
  logout,
  showForgotPasswordForm,
  forgotPassword,
  showResetPasswordForm,
  resetPassword
};