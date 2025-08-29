import bcrypt from "bcryptjs";

import prisma from "../src/db/prisma.js";

async function seedDB() {
  try {
    const hashPass = await bcrypt.hash("12345678", 10);

    await prisma.user.create({
      data: {
        username: "Asad Butt",
        email: "asad@example.com",
        password: hashPass,
        bio: "This is the best profile i have evern seen!!!",
        role: "admin",
      },
    });
  } catch (error) {
    console.log("__error while seeding db__", error);
    process.exit(1);
  } finally {
    prisma.$disconnect();
  }
}

seedDB().then().catch();
