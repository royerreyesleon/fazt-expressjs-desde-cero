const express = require('express'); // SERVIDOR
const morgan  = require('morgan'); // EVALUA LA PETICION
const app     = express();



// CONFIGURACIONES
app.set('appName', 'Este es el nombre de la aplicacion');
app.set('port', 3001);



// MOTOR DE PLANTILLA, COMO BLADE PARA LARAVEL
app.set('view engine', 'ejs');




// MIDDLEWARES
// MIDDLEWAR. SE EJECUTA ANTES QUE TODAS LAS RUTAS
function logger(req, res, next){
    console.log(`Peticion recibida ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}




// INDICARLE A EXPRESS QUE PUEDA ENTENDER LOS FORMATOS JSON
app.use(express.json());
// app.use(logger); // EJECUTAR FUNCION ANTES QUE LLEGUEN A LAS RUTAS
app.use(morgan('dev')); // EVALUA LAS PETICIONES.
// app.use((req, res, next) =>{
//     console.log('Request received');
//     next();
// })




// app.all('get', (req , res)=>{
// PARA TODAS LAS PETICIONES GET POR AQUI PASA
app.all('/get', (req , res, next)=>{
//    res.send('PETICION: get')

    console.log('Por aqui paso');
    // res.send('Finish');
    next();
    
});




// RUTAS
// http://localhost:3001/
app.get('/' , (req , res)=>{
    const data = [
        {name: 'uno'},
        {name: 'dos'},
        {name: 'tres'}
    ];

   res.render('index.ejs', {personas : data});

})


// http://localhost:3001/get
app.get('/get' , (req , res)=>{
//    res.send('PETICION: get')
   res.json({
       username:'Royer',
       lastname:'León'
   })
});



// app.post('/post' , (req , res)=>{
/*
http://localhost:3001/post/1
Content-Type application/json
{
    "nombre":"Royer",
    "valor":"10"
}
*/
app.post('/post/:id' , (req , res)=>{
    console.log(req.body);
    console.log(req.params);
    res.send('PETICION: post')
})



/*
http://localhost:3001/put/1
Content-Type application/json
*/
app.put('/put/:id' , (req , res)=>{
    // console.log(req.body);
    // console.log(req.params);

    // res.send('PETICION: put');
    res.send(`User ${req.params.id} actualizado`);

})



/*
http://localhost:3001/delete/1
Content-Type application/json
*/
app.delete('/delete/:userId' , (req , res)=>{
    // res.send('PETICION: delete')
    res.send(`User ${req.params.userId} eliminado`);
})



// MIDDLEWAR STATIC
app.use(express.static('public'));

// app.listen(3000, () =>{
app.listen(app.get('port'), () =>{
    console.log('Servidor en el puerto: ', app.get('port'));

    console.log(app.get('appName'));
})