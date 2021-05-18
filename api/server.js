const dbconfig = require('./dbconfig')
const express = require('express')
const cors = require('cors')
const app = express()
const con =dbconfig.connect()
app.use(cors())
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

app.use(express.json());
app.get('/status', function (req, res) {
  res.json({
      'status': 'OK'
  })
  
})
app.post('/create-order', function (req, res)
{
  var sql="";
  var sum= countSum(req.body.pizzaType, req.body.pizzaSize, req.body.amountOfPizzas);
  var deliveryFee = 5;
  if(req.body.delivery=="no")
  sql= "INSERT INTO pizza_order ( delivery, pizza_type, pizza_size, pizza_dough, pizza_sauce, amount_of_pizzas) VALUES ('"+req.body.delivery+"', '"+req.body.pizzaType+"', '"+req.body.pizzaSize+"','"+ req.body.pizzaDough+"','"+req.body.pizzaSauce+"','"+ req.body.amountOfPizzas+"')";
else{
  sql= "INSERT INTO pizza_order ( delivery, fullname, telephone_number, street,city, pizza_type, pizza_size, pizza_dough, pizza_sauce, amount_of_pizzas) VALUES ('"+req.body.delivery+"','"+req.body.fullname+"','"+req.body.telephoneNumber+"','"+req.body.street+"','"+req.body.city+"', '"+req.body.pizzaType+"', '"+req.body.pizzaSize+"','"+ req.body.pizzaDough+"','"+req.body.pizzaSauce+"','"+ req.body.amountOfPizzas+"')";
  sum+=deliveryFee;
}
  con.query(sql,[], function(err,result)
  {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.json({
    'summ': sum,
    'deliveryFee': deliveryFee
  })
  
  
})

app.post('/send-message', function(req,res)
{
console.log("Message is received from name: "+req.body.name+"\nemail: "+req.body.email+"\nFollowing message: "+req.body.message)
});


app.listen(3000, function(){
    console.log("Listening")
})

function countSum(type, pizzaSize, pizzaQuantity) {
  var sum = 0;
  if (type == "Margheritta") {
    if (pizzaSize == "Small") sum += 21;
    else if (pizzaSize == "Medium") sum += 26;
    else sum += 33;
  } else if (type == "Capriciosa") {
    if (pizzaSize == "Small") sum += 25;
    else if (pizzaSize == "Medium") sum += 32;
    else sum += 41;
  } else if (type == "Carbonara") {
    if (pizzaSize == "Small") sum += 27;
    else if (pizzaSize == "Medium") sum += 35;
    else sum += 45;
  } else if (type == "Greek Pizza") {
    if (pizzaSize == "Small") sum += 23;
    else if (pizzaSize == "Medium") sum += 27;
    else sum += 37;
  } else if (type == "Napolitan Pizaa") {
    if (pizzaSize == "Small") sum += 28;
    else if (pizzaSize == "Medium") sum += 36;
    else sum += 45;
  } else if (type == "Barbecue Habanero Pizza") {
    if (pizzaSize == "Small") sum += 35;
    else if (pizzaSize == "Medium") sum += 42;
    else sum += 50;
  } else if (type == "BBQ Party Pizza") {
    if (pizzaSize == "Small") sum += 35;
    else if (pizzaSize == "Medium") sum += 42;
    else sum += 50;
  } else if (type == "Parma Fit Pizza") {
    if (pizzaSize == "Small") sum += 35;
    else if (pizzaSize == "Medium") sum += 42;
    else sum += 53;
  } else {
    if (pizzaSize == "Small") sum += 34;
    else if (pizzaSize == "Medium") sum += 40;
    else sum += 47;
  }
  sum *= pizzaQuantity;
  return sum;
}


