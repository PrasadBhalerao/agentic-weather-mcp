const readline = require("readline");
const { processQuery } = require("./agent/weatherAgent");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Ask a question: ", async (query) => {

    try {

        const response = await processQuery(query);

        console.log(response);

    } catch (error) {

        console.log("Error:", error.message);

    }

    rl.close();
});