import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role, Status } from '@prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  // create two dummy articles
  const account1 = await prisma.account.upsert({
    where: { login: 'admin@exercice.com' },
    update: {},
    create: {
      login: 'admin@exercice.com',
      password: 'password_securise',
      roles: [Role.ROLE_ADMIN],
      status: Status.open,
    },
  });

  console.log({ account1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });

