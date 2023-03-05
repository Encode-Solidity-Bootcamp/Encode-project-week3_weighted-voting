async function main(){
    console.log("it works");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});