const { prisma } = require("../db/prisma.js");
const Response = require("../utils/api_response.js");
const uploadImageToCloudinary = require("../libs/cloudinary.js");

async function getAllPhones(req, res) {
  try {
    const phones = await prisma.phone.findMany({});

    return res.json(new Response(200, "all phone data", phones));
  } catch (error) {}
}

async function addNewPhone(req, res) {
  const {
    name,
    price,
    quantity,
    battery,
    ram,
    process,
    bodySize,
    camera,
    display,
    avaliableColors,
    storage,
  } = req.body;
  const { path } = req.file;

  try {
    const { url } = await uploadImageToCloudinary(path);
    const newPhone = await prisma.phone.create({
      data: {
        name,
        price: Number.parseFloat(price),
        process,
        storgae: Number.parseInt(storage),
        display,
        quantity: Number.parseInt(quantity),
        avaliableColors: avaliableColors.split(","),
        images: [url],
        battery,
        camera,
        ram: Number.parseInt(ram),
        bodySize: Number.parseFloat(bodySize),
      },
    });

    return res.json(new Response(200, "new record created", newPhone));
  } catch (error) {
    console.log(`___Error in creating new phone record___`, error);
    return res.json({
      statusCode: 500,
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}

async function deletePhone(req, res) {
  const { phoneId } = req.params;

  try {
    await prisma.phone.delete({
      where: {
        id: phoneId,
      },
    });

    return res.json(new Response(200, "record deleted"));
  } catch (error) {
    console.log(`___Error in deleting phone record___`, error);
    return res.json({
      statusCode: 500,
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}

async function updatePhoneData(req, res) {
  const { phoneId } = req.params;
  const newData = req.body;

  try {
    await prisma.phone.update({
      where: {
        id: phoneId,
      },
      data: {
        ...newData,
      },
    });

    return res.json(new Response(200, "record updated"));
  } catch (error) {
    console.log(`___Error in updating phone record___`, error);
    return res.json({
      statusCode: 500,
      message: "INTERNAL_SERVER_ERROR",
    });
  }
}

module.exports = {
  getAllPhones,
  addNewPhone,
  deletePhone,
  updatePhoneData,
};
