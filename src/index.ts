import app from './app';

import { connection } from './database';

async function main() {

    connection();
    await app.listen(app.get('port'));
    console.log('Server on PORT: ', app.get('port'));
}

main();