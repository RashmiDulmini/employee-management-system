import jwt from 'jsonwebtoken'
import con from '../Utils/db.js'

//export default function AdminRoute() {

    const router = express.Router()

    router.post('/adminlogin', (req,res) =>{
        const sql = "SELECT * from admin email = ? and password = ?"
        con.query(sql,[req.body.email, req.body.password], (err, result) =>{
            if(err) return res.json({logStatus: false, Error: "Query error"})
                if(result.length > 0){
                    const email = result[0].email;
                    const token = jwt.sign({role: "admin", email: email}, "jwt_secret_key", {expiresIn: 'id'});
                    res.cookie('token', token)
                    return res.json({logStatus: true});
                }
                else{
                    return res.json({logStatus: false, Error: "Wrong Email or Password"})
                }
        })

    })

 export { router as AdminRouter }
//}
