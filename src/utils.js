function generateID() {
    const time = Date.now();
    const randomNumber = Math.floor(Math.random() * 1000000001);
   
    const generateID = time + "_" + randomNumber;

return generateID;
} 

export { generateID };    