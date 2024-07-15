import app from "./app";
const port = 8500;

async function main() {
  app.listen(port, () => {
    
    console.log(`Server running on port ${port}`);
  });
}

main();
