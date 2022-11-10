const bcrypt = require("bcryptjs");

const web_routes = (app) =>{

    const menu_api = require('../menu.json');
    const obj_menu_data = JSON.parse(JSON.stringify(menu_api));

    const reg_user = require('../db/userdata');

    app.get('/', (req,res)=>{
        res.render('index',{
            menu_data:obj_menu_data.main_menu
        });
    })
    app.get('/login', (req,res)=>{
        res.render('login');
    })
    app.get('/register', (req,res)=>{
        res.render('register');
    })
    app.get('/cart/:id', (req,res)=>{
        const fetched_id = req.params.id;
        const fooditem_id = fetched_id.split('-');
        const fooditem_detail = obj_menu_data[fooditem_id[0]][fooditem_id[1]];
        res.render('cart',{
            fooditem_detail:fooditem_detail
        });
    })
    // app.post('update-cart', (req,res)=>{
    //     return res.JSON({ data: 'All Ok'});
    // })

    app.get('/pizza', (req,res)=>{
        res.render('pizza',{
            menu_data:obj_menu_data.pizza
        });
    })
    app.get('/burger', (req,res)=>{
        res.render('burger',{
            menu_data:obj_menu_data.burger
        });
    })
    app.get('/noodles', (req,res)=>{
        res.render('noodles',{
            menu_data:obj_menu_data.noodles
        });
    })
    app.get('/desserts', (req,res)=>{
        res.render('desserts',{
            menu_data:obj_menu_data.desserts
        })
    })
    app.get('/others', (req,res)=>{
        res.render('others',{
            menu_data:obj_menu_data.others
        })
    })
    app.get('/meals', (req,res)=>{
        res.render('meals',{
            menu_data:obj_menu_data.meals
        })
    })

    app.post('/register', async (req,res)=>{
        const hashed_password = await bcrypt.hash(req.body.password, 10);
        let newReg = new reg_user({
            username:req.body.username,
            email:req.body.email,
            password:hashed_password
        });
        newReg.save();
        res.redirect("/");
    })

    app.post('/login', async (req,res)=>{
        try {
            const email = req.body.email;
            const password = req.body.password;

            const user_email = await reg_user.findOne({email:email});

            const isMatch = await bcrypt.compare(password, user_email.password);

            if(isMatch){
                console.log('password matched');
                res.status(200).send(`Login Successful ${user_email.username}`);
            }
            else{
                console.log('password not matched');
                res.status(200).send("Login Not Successful");
            }

        } catch (error) {
            res.status(400).send('Invalid Email');
        }
    })
}

module.exports = web_routes;