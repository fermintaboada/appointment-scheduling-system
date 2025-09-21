import { appDataSource } from './config/data-source';
import { PORT } from './config/env';
import server from './server';
import "reflect-metadata"


appDataSource.initialize()
    .then(() => {
        console.log("Conexion a la DB exitosa")
        server.listen(PORT, () => {
    console.log('Iniciando...');
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    })
})
.catch((err: Error) => console.log(err.message))
