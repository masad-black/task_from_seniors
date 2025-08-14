import bcrypt from "bcryptjs";

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function checkPassword(password: string, hPass: string) {
  return bcrypt.compare(password, hPass);
}

export { hashPassword, checkPassword };
