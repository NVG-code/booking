const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const users = require("../src/data/users.json");
const hosts = require("../src/data/hosts.json");
const properties = require("../src/data/properties.json");
const amenities = require("../src/data/amenities.json");
const bookings = require("../src/data/bookings.json");
const reviews = require("../src/data/reviews.json");

async function main() {
  await prisma.user.createMany({ data: users });
  await prisma.host.createMany({ data: hosts });
  await prisma.amenity.createMany({ data: amenities });

  for (const property of properties) {
    await prisma.property.create({ data: property });
  }

  await prisma.booking.createMany({ data: bookings });
  await prisma.review.createMany({ data: reviews });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
