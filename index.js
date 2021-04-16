const express = require('express');
const morgan = require('morgan');
const app = express();

// CONFIGURACIONES
app.set('appName', 'Este es el nombre de la aplicacion');
app.set('port', 3000);

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
// app.use(logger);
app.use(morgan('dev'))
// app.use((req, res, next) =>{
//     console.log('Request received');
//     next();
// })


// app.all('get', (req , res)=>{
app.all('/get', (req , res, next)=>{
//    res.send('PETICION: get')

    // console.log('Por aqui paso');
    // res.send('Finish');
    next();
    
});


// RUTAS

app.get('/' , (req , res)=>{
    const data = [
        {name: 'uno'},
        {name: 'dos'},
        {name: 'tres'}
    ];

   res.render('index.ejs', {personas : data});

})

app.get('/get' , (req , res)=>{
//    res.send('PETICION: get')
   res.json({
       username:'Royer',
       lastname:'León'
   })
});

// app.post('/post' , (req , res)=>{
app.post('/post/:id' , (req , res)=>{
    console.log(req.body);
    console.log(req.params);
    res.send('PETICION: post')
})

app.put('/put/:id' , (req , res)=>{
    // console.log(req.body);
    // console.log(req.params);

    // res.send('PETICION: put');
    res.send(`User ${req.params.id} actualizado`);

})

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