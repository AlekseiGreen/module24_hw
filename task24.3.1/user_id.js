const https = require('node:https');

https.get('https://jsonplaceholder.typicode.com/posts', (res)=>{
    console.log('Status code: ', res.statusCode);
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', ()=>{
        const userArray = JSON.parse(data);
        let j=0;
        for(let i=0; i < userArray.length; i++){
            if(userArray[i].userId === 1){
                j++;
            }
        }
        console.log('Количество постов:', j);
    });

}).on('error', (err)=>{
    console.log(`Error= ${err}`);
});