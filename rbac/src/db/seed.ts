import { prisma } from "./prisma_connect.ts";
import { hashPassword } from "../utils/password.ts";

// adding a super_admin record in db by seed
async function addSuperAdmin() {
  try {
    const hPass = await hashPassword("12345678");

    await prisma.users.create({
      data: {
        name: "Quaid-e-Azam",
        age: 56,
        role: "super_admin",
        email: "quiadeazam2@example.com",
        password: hPass,
      },
    });
  } catch (error) {
    console.log(`__error in seeding db__`, error);

    // removing connection
    prisma.$disconnect();
    process.exit(1);
  }
}

addSuperAdmin();
