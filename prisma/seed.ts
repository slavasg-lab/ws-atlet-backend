import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// COMMAND FOR GENERATING PUBLIC_KEY FROM PRIVATE_KEY
// nearAPI.KeyPair.fromString('ed25519:4zMWLB15fV1BEM1ZfoFu75XJqKSyTczzxjm8AKS8JYTdpHzactTysphHR1scE2Bef3rajFhFtJEwgsMr5NeLfJpR').publicKey.toString()

// ACCOUNT 1

// named account address: anakin.testnet
// mnemonics: juice chair tattoo defy female worry radar affair road grace accident mirror

// const anakin_private_key = "ed25519:4qVvL55tgYG8AfCvdKsod4hCnhn5pEsK66oVVJJnzUuSgqZpbAj6113dCNxzXsKF55VV7QGU4jbEC2vEs2RRqkBS";
// const anakin_public_key  = "ed25519:73g5FkDR5f9onJM7goQEZFMZZTH53Gv4cGAaEeEoQgDW";

// ACCOUNT 2

// named account address: paisley.testnet
// mnemonics: couch accuse catch beach orchard episode bargain cook gentle penalty topple timber

// const paisley_private_key = "ed25519:4zMWLB15fV1BEM1ZfoFu75XJqKSyTczzxjm8AKS8JYTdpHzactTysphHR1scE2Bef3rajFhFtJEwgsMr5NeLfJpR";
// const paisley_public_key  = "ed25519:4U76jDwfEVekd9rhTVBAvGqJXUyKtWV2AgvfAsUMwdzR";

async function main() {
  const anakin = await prisma.user.upsert({
    where: {
      publicKey: 'ed25519:73g5FkDR5f9onJM7goQEZFMZZTH53Gv4cGAaEeEoQgDW',
    },
    update: {},
    create: {
      publicKey: 'ed25519:73g5FkDR5f9onJM7goQEZFMZZTH53Gv4cGAaEeEoQgDW',
      name: 'Anakin Barlowe',
      email: 'anakin.barlowe@manvantara.com.ua',
      role: 'BETATESTER',
      sequenceNumber: 0,
    },
  });

  const paisley = await prisma.user.upsert({
    where: {
      publicKey: 'ed25519:4U76jDwfEVekd9rhTVBAvGqJXUyKtWV2AgvfAsUMwdzR',
    },
    update: {},
    create: {
      publicKey: 'ed25519:4U76jDwfEVekd9rhTVBAvGqJXUyKtWV2AgvfAsUMwdzR',
      name: 'Paisley Madden',
      email: 'paisley.madden@manvantara.com.ua',
      role: 'BETATESTER',
    },
  });

  console.log({ anakin, paisley });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();
    process.exit(1);
  });
