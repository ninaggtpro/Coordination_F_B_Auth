import 'dotenv/config';
import { PrismaClient, Role, Status } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  if (process.env.NODE_ENV === 'production') {
    console.log('Seed skipped: Not allowed in production environment');
    return;
  }

  console.log('Seeding development database...');

  const passwordAdmin = await bcrypt.hash(
    process.env.SEED_ADMIN_PASSWORD || 'admin123',
    roundsOfHashing,
  );
  const passwordUser = await bcrypt.hash(
    process.env.SEED_USER_PASSWORD || 'user123',
    roundsOfHashing,
  );

  await prisma.account.upsert({
    where: { email: process.env.SEED_ADMIN_EMAIL || 'admin@cinema.com' },
    update: {
      password: passwordAdmin,
    },
    create: {
      email: process.env.SEED_ADMIN_EMAIL || 'admin@cinema.com',
      password: passwordAdmin,
      firstName: process.env.SEED_ADMIN_FIRSTNAME || 'Admin',
      lastName: process.env.SEED_ADMIN_LASTNAME || 'Cinema',
      roles: [Role.ROLE_ADMIN, Role.ROLE_USER],
      status: Status.open,
    },
  });

  await prisma.account.upsert({
    where: { email: process.env.SEED_USER_EMAIL || 'user@cinema.com' },
    update: {
      password: passwordUser,
    },
    create: {
      email: process.env.SEED_USER_EMAIL || 'user@cinema.com',
      password: passwordUser,
      firstName: process.env.SEED_USER_FIRSTNAME || 'John',
      lastName: process.env.SEED_USER_LASTNAME || 'Doe',
      roles: [Role.ROLE_USER],
      status: Status.open,
    },
  });

  console.log('Seed completed: 2 accounts created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


