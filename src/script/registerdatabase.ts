import prisma from "./prismaclient";
import Products from "../data/products";

async function main() {
  await prisma.product.createMany({
    data: Products.map(({ ...rest }) => rest),
  });
  console.log("Products seeded!");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());