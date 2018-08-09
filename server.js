const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.use((req,res,next) => {
  var now=new Date().toString();
  var log=now+' '+req.method+' '+req.url;
  fs.appendFile('server.log', log+'\n', (err) => {
    if(err){
      console.log('Unable to write to the file server.log.');
    }
  });
  console.log(log);
  next();
});
// app.use((req,res,next) => {
//   res.render('maintenance.hbs', {
//     message:'Page is loading...'
//   });
// });
app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res) => {
  // res.send('<h1>hey its working....</h1>');
  // res.send({
  //   name:'Simran',
  //   likes:['drawing','dancing','etc']
  // });
  res.render('home.hbs',{
    pageTitle:'Home',
    welcomeMessage:'Welcome to this new website!'
  });
});

app.get('/about', (req,res) => {
  // res.send('This is the about page.');
  res.render('about.hbs', {
    pageTitle:'About'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    status:450,
    errormessage:'Unable to process the request.'
  });
});

app.listen(8000, () => {
  console.log('Server has started and is up on port 8000.');
});
