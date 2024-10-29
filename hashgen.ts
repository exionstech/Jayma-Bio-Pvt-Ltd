import bcrypt from "bcrypt";

async function main() {
  const pass = "Admin@2024";
  const hash = await bcrypt.hash(pass, 10);

  console.log(hash);
}

main().catch((err) => {
  console.log(err);
});
