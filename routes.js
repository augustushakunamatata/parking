//const { password } = require('pg/lib/defaults')

const { res } = require('pino-std-serializers')
const {addusers,deleteusers,updateusers,getvechiclebyplate_number,addvechicle,gettoday,loginSchema,exit,avalable,car,addusers1,adddetails,getallid,addmap,updatevechicle,addhours,updateparking_system,addparking_system,deletevechicle,getbyphonenumber,updateparking_section_area,addparking,updateparking,addparking_section_area} = require('./schemas.js')
const { query } = require('fastify')




async function routes(fastify, options, next) {
    const client = fastify.db.client

fastify.post('/', {schema: addusers}, async function(request, reply) {
    const {name,user_id,phonenumber,password} = request.body
    const done = false
   console.log(request.body);
    const query = {
        text: `INSERT INTO users (user_id,name,phonenumber,password)
                VALUES($1,$2,$3,$4) RETURNING *`,
        values: [user_id,name,phonenumber,password]
        }
        console.log("query :",query);
        console.log("user login sucessful")
    try {
        const {rows} = await client.query(query)
        console.log(rows[0])
        
        reply.code(200).send(rows)
      
        //return {created: true}
    } catch (err) {
        console.log(err);
        throw new Error(err)
    }
    
})
fastify.put('/:phone_number',{schema: updateusers}, async function (request, reply) {
    const phonenumber = request.phonenumber
    const {name} = request.body
    const query = {
        text:  'UPDATE users SET name = $1 WHERE phonenumber = $2 RETURNING *',
        values : [name,phonenumber]
    }
    console.log("query:",query)
    try {
        const {rows} = await client.query(query)
        console.log(rows)
        reply.code(200).send(rows)
      
    } catch (err) {
        throw new Error(err)
    }
} )

fastify.delete('/:phonenumber', {schema: deleteusers}, async function(request, reply) {
    console.log(request.params)
    try {
        const {rows} = await client.query('DELETE FROM users WHERE phonenumber = $1 RETURNING *', [request.params.phonenumber])
        console.log(rows[0])
        reply.code(200).send("successfully deleted")
        
    } catch(err) {
        throw new Error(err)
    }
})

fastify.get('/users/:phonenumber',{schema:getbyphonenumber}, async function  (request, reply) {

    try{
        //console.log($1);debugger
        const {rows} = await client.query('SELECT * FROM users WHERE phonenumber = $1', [request.params.phonenumber])
            console.log(rows)
    
            reply.send(rows)
    } catch(err) {
            throw new Error(err)
        }
    })
    
    fastify.get('/users', {}, async function (request, reply) {
        try {
            const {rows} = await client.query('SELECT * FROM users ORDER BY user_id ASC')
            console.log(rows)
            reply.send(rows)
        } catch(err) {
            throw new Error(err)
        }
    })
    









/////////////////////////////////////////////////////////////////////////////////////////////////////////

fastify.get('/vechicle/:plate_number',{schema:getvechiclebyplate_number}, async function  (request, reply) {

    try{
        //console.log($1);debugger
        const {rows} = await client.query('SELECT * FROM vechicle WHERE plate_number = $1', [request.params.plate_number])
            console.log(rows)
    
            reply.send(rows)
    } catch(err) {
            throw new Error(err)
        }
    })
    
    fastify.post('/addvechicle', {schema: addvechicle}, async function(request, reply) {
        const {vechicle_id,plate_number,vechicle_type} = request.body
        const done = false
       console.log(request.body);
        const query = {
            text: `INSERT INTO vechicle (vechicle_id,plate_number,vechicle_type)
                    VALUES($1,$2,$3) RETURNING *`,
            values: [vechicle_id,plate_number,vechicle_type]
            }
            console.log("query :",query);
        try {
            const {rows} = await client.query(query)
            console.log(rows[0])
            
            reply.code(200).send(rows)
          
            //return {created: true}
        } catch (err) {
            console.log(err);
            throw new Error(err)
        }
        
    })

fastify.put('/vechicle/:id',{schema: updatevechicle}, async function (request, reply) {
    const id = request.params.id
    const {plate_number,vechicle_type} = request.body
    const query = {
        text:  'UPDATE vechicle SET plate_number = $1,vechicle_type =$2 WHERE vechicle_id = $3 RETURNING *',
        values : [vechicle_type,plate_number,id]
    }
    console.log("query:",query)
    try {
        const {rows} = await client.query(query)
        console.log(rows)
        reply.code(200).send(rows)
      
    } catch (err) {
        throw new Error(err)
    }
} )

fastify.delete('/vechicle/:id', {schema: deletevechicle}, async function(request, reply) {
console.log(request.params)
try {
    const {rows} = await client.query('DELETE FROM vechicle WHERE vechicle_id = $1 RETURNING *', [request.params.id])
    console.log(rows[0])
    reply.code(200).send("successfully deleted")
    
} catch(err) {
    throw new Error(err)
}
})
fastify.get('/vechicle_details', {}, async function (request, reply) {
    try {
        const {rows} = await client.query('SELECT * FROM vechicle ORDER BY vechicle_id ASC')
        console.log(rows)
        reply.send(rows)
    } catch(err) {
        throw new Error(err)
    }
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// fastify.post('/validatephonenumber', async function(request, reply) {
//     const {phonenumber} =request.body
//     const done=false
//     console.log(request.body);
//     {
//       if (err) {
//         return reply.send(err)
//       }
  
//       // Execute a SELECT query to check if the phone number already exists in the database
//       client.query('SELECT * FROM users WHERE phonenumber=$1', [phonenumber], (err, result) => {
//         release() // release the client back to the pool
  
//         if (err) {
//           return reply.send(err)
//         }
  
//         // If the phone number exists, return an error message
//         if (result.rows.length > 0) {
//           return reply.send({ error: 'Phone number is already in use' })
//         }
  
//         // If the phone number does not exist, return a success message
//         return reply.send({ success: 'Phone number is available' })
//       })
//     }
//   })


////parking///
   fastify.post('/parking', {schema: addparking}, async function(request, reply) {
    const {parking_id,parking_date,date_checkin,date_checkout,parking_place,gate_in,gate_out,total_number_of_car,total_number_of_bike,parking_history} = request.body
    const done = false
     console.log(request.body);
    const query = {
        text: `INSERT INTO parking (parking_id,parking_date,date_checkin,date_checkout,parking_place,gate_in,gate_out,total_number_of_car,total_number_of_bike,parking_history)
                VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
        values: [parking_id,parking_date,date_checkin,date_checkout,parking_place,gate_in,gate_out,total_number_of_car,total_number_of_bike,parking_history]
        }
        console.log("query :",query);
        console.log("user login sucessful")
    try {
        const {rows} = await client.query(query)
        console.log(rows[0])
        
        reply.code(200).send(rows)
    } catch (err) {
        console.log(err);
        throw new Error(err)
    }
    
})

fastify.delete('/parkingdelete/:id', {schema: deletevechicle}, async function(request, reply) {
    console.log(request.params)
    try {
        const {rows} = await client.query('DELETE FROM parking WHERE parking_id = $1 RETURNING *', [request.params.id])
        console.log(rows[0])
        reply.code(200).send("successfully deleted")
        
    } catch(err) {
        throw new Error(err)
    }
    })
    fastify.get('/parking_details', {}, async function (request, reply) {
        try {
            const {rows} = await client.query('SELECT * FROM parking ORDER BY parking_id ASC')
            console.log(rows)
            reply.send(rows)
        } catch(err) {
            throw new Error(err)
        }
    })


    fastify.put('/parkingupdate/:id',{schema: updateparking}, async function (request, reply) {
        const id = request.params.id
        //console.log("query:",query)
        const {parking_place,gate_in,gate_out,total_number_of_bike,total_number_of_car,parking_history,parking_date,date_checkin,date_checkout} = request.body
        const query = {
            text:  'UPDATE parking SET parking_place = $1,gate_in =$2,gate_out = $4,total_number_of_car = $5,total_number_of_bike = $6,parking_history = $7,parking_date = $8,date_checkin = $9,date_checkout = $10 WHERE parking_id = $3 RETURNING *',
            values : [id,parking_place,gate_in,gate_out,total_number_of_bike,total_number_of_car,parking_history,parking_date,date_checkin,date_checkout]
        }
        console.log("query:",query)
        try {
            const {rows} = await client.query(query)
            console.log(rows)
            reply.code(200).send(rows)
          
        } catch (err) {
            throw new Error(err)
        }
    } )
    








    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    fastify.post('/parking_section_area', {schema: addparking_section_area}, async function(request, reply) {
        const {parking_section_id,parking_section_area,capacity} = request.body
        const done = false
       console.log(request.body);
        const query = {
            text: `INSERT INTO parking_section_area (parking_section_id,parking_section_area,capacity)
                    VALUES($1,$2,$3) RETURNING *`,
            values: [parking_section_id,parking_section_area,capacity]
            }
            console.log("query :",query);
           // console.log("user login sucessful")
        try {
            const {rows} = await client.query(query)
            console.log(rows[0])
            
            reply.code(200).send(rows)
          
            //return {created: true}
        } catch (err) {
            console.log(err);
            throw new Error(err)
        }
        
    })

    fastify.put('/parking_section_area/:id',{schema: updateparking_section_area}, async function (request, reply) {
        const id = request.params.id
        const {parking_section_area,capacity} = request.body
        const query = {
            text:  'UPDATE parking_section_area SET parking_section_area = $1,capacity =$2 WHERE parking_section_id = $3 RETURNING *',
            values : [parking_section_area,capacity,id]
        }
        console.log("query:",query)
        try {
            const {rows} = await client.query(query)
            console.log(rows)
            reply.code(200).send(rows)
          
        } catch (err) {
            throw new Error(err)
        }
    } )
    fastify.delete('/parking_section_area/:id', {schema: deletevechicle}, async function(request, reply) {
        console.log(request.params)
        try {
            const {rows} = await client.query('DELETE FROM parking_section_area WHERE parking_section_area_id = $1 RETURNING *', [request.params.id])
            console.log(rows[0])
            reply.code(200).send("successfully deleted")
            
        } catch(err) {
            throw new Error(err)
        }
        })

        
        fastify.get('/parkingsectiondetails', {}, async function (request, reply) {
            try {
                const {rows} = await client.query('SELECT * FROM parking_section_area ORDER BY parking_section_id ASC')
                console.log(rows)
                reply.send(rows)
            } catch(err) {
                throw new Error(err)
            }
        })

    














        /////////////////////parking_system////////////////
        fastify.post('/parkingsystem', {schema: addparking_system}, async function(request, reply) {
            const {parking_system_id,parking_code,total_collection,collection_for_car,collection_for_bike} = request.body
            const done = false
           console.log(request.body);
            const query = {
                text: `INSERT INTO parking_system(parking_system_id,parking_code,total_collection,collection_for_car,collection_for_bike)
                        VALUES($1,$2,$3,$4,$5) RETURNING *`,
                values: [parking_system_id,parking_code,total_collection,collection_for_car,collection_for_bike]
                }
                console.log("query :",query);
               // console.log("user login sucessful")
            try {
                const {rows} = await client.query(query)
                console.log(rows[0])
                
                reply.code(200).send(rows)
              
                //return {created: true}
            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
            
        })

        fastify.put('/parking_system/:id',{schema: updateparking_system}, async function (request, reply) {
            const id = request.params.id
            const {total_collection,collection_for_car,collection_for_bike} = request.body
            const query = {
                text:  'UPDATE parking_system SET total_collection = $1,collection_for_car = $2,collection_for_bike = $4 WHERE parking_system_id = $3 RETURNING *',
                values : [total_collection,collection_for_car,collection_for_bike,id]
            }
            console.log("query:",query)
            try {
                const {rows} = await client.query(query)
                console.log(rows)
                reply.code(200).send(rows)
              
            } catch (err) {
                throw new Error(err)
            }
        } )



        fastify.get('/parkingsystemdetails', {}, async function (request, reply) {
            try {
                const {rows} = await client.query('SELECT * FROM parking_system ORDER BY parking_system_id ASC')
                console.log(rows)
                reply.send(rows)
            } catch(err) {
                throw new Error(err)
            }
        })
    

        fastify.post('/hours', {schema: addhours}, async function(request, reply) {
            const {hours_id,parking_price_by_hours} = request.body
            const done = false
           console.log(request.body);
            const query = {
                text: `INSERT INTO hours(hours_id,parking_price_by_hours)
                        VALUES($1,$2) RETURNING *`,
                values: [hours_id,parking_price_by_hours]
                }
                console.log("query :",query);parking_id
               // console.log("user login sucessful")
            try {
                const {rows} = await client.query(query)
                console.log(rows[0])
                
                reply.code(200).send(rows)
              
                //return {created: true}
            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
            
        })
        fastify.post('/map', {schema: addmap}, async function(request, reply) {
            const {map_id} = request.body
            const done = false
           console.log(request.body);
            const query = {
                text: `INSERT INTO map(map_id)
                        VALUES($1) RETURNING *`,
                values: [map_id]
                }
                console.log("query :",query);
            try {
                const {rows} = await client.query(query)
                console.log(rows[0])
                
                reply.code(200).send(rows)
              
                //return {created: true}
            } catch (err) {
                console.log(err);
                throw new Error(err)
            }
            
        })

        fastify.get('/maptable', {}, async function (request, reply) {
            try {
                const {rows} = await client.query('SELECT * FROM map ORDER BY map_id ASC')
                console.log(rows)
                reply.send(rows)
            } catch(err) {
                throw new Error(err)
            }
        })
    



        fastify.get('/hours', {}, async function (request, reply) {
            try {
                const {rows} = await client.query('SELECT * FROM hours ORDER BY hours_id ASC')
                console.log(rows)
                reply.send(rows)
            } catch(err) {
                throw new Error(err)
            }
        })
    

        fastify.get('/all/:id',{schema:getallid}, async function  (request, reply) {
        
            try{
                //console.log($1);debugger
               // console.log(request)
                console.log(request.params.id)
                const {rows} = await client.query((`select *from users inner join map on map.phonenumber=users.phonenumber left join vechicle on vechicle.vechicle_id =map.vechicle_id left join parking on parking.parking_id =map.parking_id  left join parking_section_area on parking_section_area.parking_id=map.parking_id left join parking_system on parking_system.parking_system_id=map.parking_system_id where users.phonenumber='${request.params.id}'`))
                    console.log(rows)
                   // console.log(request.params.id)
                    console.log("query",query)
    
                    reply.send(rows)
            } catch(err) {
                    throw new Error(err)
                }
            })
        
//             fastify.post('/auth', async (req, reply) => {

//                 // are the credentials valid? (PS: if you copy-pasted this code, take a look at the full example below)
//                 const valid_credentials = req.body.user_id === '1' && req.body.password === '7824045704';
//                 if(!valid_credentials)
//                     return { message: 'Invalid credentials. You shall not pass!' };
            
//                 return { message: 'Access granted. Enjoy the party!' };
//             });
// //       fastify.post('/validate-phone-number', (request, reply) => {
//        const phonenumber = request.body.phonenumber

//   // Connect to the PostgreSQL database
//        fastify.pg.connect((err, client, release) => {
//     if (err) {
//       return reply.send(err)
//     }

//     // Execute a SELECT query to check if the phone number already exists in the database
//     client.query('SELECT * FROM users WHERE phonenumber =  $1', [phonenumber], (err, result) => {
//       release() // release the client back to the pool

//       if (err) {
//         return reply.send(err)
//       }

//       // If the phone number exists, return an error message
//       if (result.rows.length > 0) {
//         return reply.send({ error: 'Phone number is already in use' })
//       }

//       // If the phone number does not exist, return a success message
//       return reply.send({ success: 'Phone number is available' })
//     })
//   })
// })
fastify.post('/auth', async (req, reply) => {

    
    let valid_credentials = req.body.password === '@1234' && req.body.phonenumber === '7824045704';

   // let valid_credentials1 = req.body.password === '@12345' && req.body.phonenumber === '123456789';
   

   if(!valid_credentials)
   return { message: 'Invalid credentials' };

return { message: 'Access granted' };
});
    
   // let valid_credentials1 =req.body.user_id === '2' && req.body.phonenumber === ''
    
   fastify.post('/auth1', async (req, reply) => {

    
    let valid_credentials1 = req.body.password === '@12345' && req.body.phonenumber === '123456789';

   // let valid_credentials1 = req.body.password === '@12345' && req.body.phonenumber === '123456789';
   

   if(!valid_credentials1)
   return { message: 'Invalid credentials' };

return { message: 'Access granted' };
});
    


 

            
    



  

    


// fastify.post('/auth', async (req, reply){
//     const {phonenumber} = request.body



//         /*var userInDatabase = await _context.users.FirstOrDefaultAsync(u => u.mobileNumber == userlogin.Username && u.Password == userlogin.Password);*/
//         //var user = _context.FirstOrDefault(u => u.mobileNumber == userlogin.mobileNumber && u.password == userlogin.password);
//         //userLoginforQuery selectQuery = new userLoginforQuery();
//         var sql = "SELECT * FROM auto_stand.auto_details WHERE (mobile_number = '" + userlogin.mobileNumber + "',password = '" + userlogin.password + "')";
//         if (sql == null)
//         {
//             response.status = 404;
//             response.Message = "Not found";
//         }
//         else
//         {
//             isAvailableresponse.mobileNumber = userlogin.mobileNumber;
//             isAvailableresponse.isAvailable = "Yes";
//             response.status = 200;
//             response.Message = "Success";
//         }
      
fastify.post('/details_table', {schema: adddetails}, async function(request, reply) {
    const {user_id,phonenumber,vechicle_type,plate_number,parking_date,time_checkin,time_checkout,name} = request.body
    const done = false
   console.log(request.body);
    const query = {
        text: `INSERT INTO details(user_id,name,phonenumber,vechicle_type,plate_number,parking_date,time_checkin,time_checkout)
                VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
        values: [user_id,phonenumber,vechicle_type,plate_number,parking_date,time_checkin,time_checkout,name]
        }
        console.log("query :",query);
       
    try {
        const {rows} = await client.query(query)
        console.log(rows[0])
        
        reply.code(200).send(rows)
      
        //return {created: true}
    } catch (err) {
        console.log(err);
        throw new Error(err)
    }
    
})

fastify.get('/details', {}, async function (request, reply) {
    try {
        const {rows} = await client.query('SELECT * FROM details')
        console.log(rows)
        reply.send(rows)
    } catch(err) {
        throw new Error(err)
    }
})

fastify.get('/type', {}, async function (request, reply) {
    try {
        const {rows} = await client.query('select * from vechicle_type left join master on type_id = id')
        console.log(rows)
        reply.send(rows)
    } catch(err) {
        throw new Error(err)
    }
})
fastify.post('/auth12', async (req, reply) => {

  // Write, Edit and Run your Javascript code using JS Online Compiler
function parkingFee() {           
    var parkingHours = parseint(prompt("Enter hours parked:1"));
  
    if (parkingHours <= 4.0 && parkingHours > 0.5) {
      var amount = parkingHours * 1.0;
      console.log("Parking fee is $" + amount);
    }
    else if (parkingHours <= 0.5) {
      console.log("There are no parking amount.");
    }
    else if (parkingHours > 4.0 && parkingHours <= 24.0) {
      var amount = 6.0;
      console.log("Parking fee is $" + amount);
    }
    else if (parkingHours > 24) {           
      var fee3 = parkingHours * 6.0 / 24;
      console.log("Parking fee is $" + amount);
    }   
    console.log(rows)
    reply.send(rows)                 
  }


  
  console.log("vechicle_type:1","plate_number:TN11AY5656","phonenumber:123456789","entry:04:00:00",'date:12/01/2023');
  console.log("vechicle_type:2","phone_number:7824045704","plate_number:TN11AY4671","entry:03:00:00",'date:12/01/2023');


  console.log("vechicle_type:","phone_number:","plate_number:","entry:",'date:');
  console.log("vechicle_type:","phone_number:","plate_number:","entry:",'date:');
  console.log("vechicle_type:","phone_number:","plate_number:","entry:",'date:');
  console.log("vechicle_type:","phone_number:","plate_number:","entry:",'date:');

  
});



    
    



    fastify.get('/final', {}, async function (request, reply) {
        try {
            //const {rows} = await client.query('select * from vechicle_type,users,vechicle,master left join parking on parking_id=parking_id  ')
            //console.log(rows)
           // reply.send(rows)
        } catch(err) {
            throw new Error(err)
        }
      
    console.log("vechicle_type:","phonenumber:","plate_number:","exit:","amount:");
    console.log("vechicle_type:","phonenumber:","plate_number:","exit:","amount:");
    console.log("vechicle_type:","phonenumber:","plate_number:","exit:","amount:");
    console.log("vechicle_type:","phonenumber:","plate_number:","exit:","amount:");

    

    
    })
    



    fastify.get('/vehicle', {}, async function (request, reply) {
        try {
            const {rows} = await client.query('select * from vehicle left join users1 on vehicle_id = userid')
            console.log(rows)
            reply.send(rows)
        } catch(err) {
            throw new Error(err)
        }
    //     console .log("vechicle_type:2"
    // ,"plate_number:TN11AY4671","phone_number:7824045704","entry:03:10:00","exit:04:10:00","amount:40",);
    // console.log("vechicle_type:1","plate_number:TN11AY5656","phonenumber:123456789","entry:11:45:00","exit:12:30","amount:50");
    // console.log("vechicle_type:1","phone_number:123456789","plate_number:TN11AY5656","entry:10.30:00","exit:11:45:00","amount:120");
    // console.log("vechicle_type:2","phone_number:7824045704","plate_number:TN11AY4671","entry:10:00:00","exit:11:45:00","amount:50");
    // console.log("vechicle_type:2","phonenumber:7824045704","plate_number:TN11AY4671","enity:10:00:00","exit:01:45:00","amount:130");
    })
    fastify.get('/exit/:plate_number',{schema:exit}, async function  (request, reply) {

        try{
            //console.log($1);debugger
            const {rows} = await client.query('SELECT * FROM exit WHERE plate_number = $1', [request.params.plate_number])
                console.log(rows)
        
                reply.send(rows)
        } catch(err) {
                throw new Error(err)
            }
        })
        
        fastify.get('/information', {}, async function (request, reply) {
            try {
                const {rows} = await client.query('SELECT id, no_of_car, no_of_bike FROM public.no;')
                console.log(rows)
                reply.send(rows)
            } catch(err) {
                throw new Error(err)
            }
        })

        fastify.get('/empolyee/user', {}, async function (request, reply) {
            try {
                const {rows} = await client.query('select empoloyee.emp_id,empoloyee_name, department.dep_id ,depname from empoloyee left join department on empoloyee.emp_id=department.dep_id')
                console.log(rows)
                reply.send(rows)
            } catch(err) {
                throw new Error(err)
            }
        })
        // fastify.post('/addvechicles', {schema: addvechicles}, async function(request, reply) {
        //     const {vechicle_id,plate_number,vechicle_type} = request.body
        //     const done = false
        //    console.log(request.body);
        //     const query = {
        //         text: `INSERT INTO vechicles (id,plate_number,vechicle_type,date)
        //                 VALUES($1,$2,$3) RETURNING *`,
        //         values: [id,plate_number,vechicle_type,date,]
        //         }
        //         console.log("query :",query);
        //     try {
        //         const {rows} = await client.query(query)
        //         console.log(rows[0])
                
        //         reply.code(200).send(rows)
              
        //         //return {created: true}
        //     } catch (err) {
        //         console.log(err);
        //         throw new Error(err)
        //     }
            
        // })

    fastify.post('/addusers1', {schema: addusers1}, async function(request, reply) {
        const {id,platenumber,phone_number} = request.body
        const done = false
       console.log(request.body);
        const query = {
            text: `INSERT INTO add (id,phone_number,platenumber)
                    VALUES($1,$2,$3) RETURNING *`,
            values: [id,phone_number,platenumber]
            }
            console.log("query :",query);
           // console.log("user login sucessful")
        try {
            const {rows} = await client.query(query)
            console.log(rows[0])
            
            reply.code(200).send(rows)
          
            //return {created: true}
        } catch (err) {
            console.log(err);
            throw new Error(err)
        }
        console.log("id:","phonenumber:","plate_number:","entry:");  console.log("id:","phonenumber:","plate_number:","entry:");
        console.log("id:","phonenumber:","plate_number:","entry:");
        console.log("id:","phonenumber:","plate_number:","entry:");
        console.log("id:","phonenumber:","plate_number:","entry:");
        console.log("id:","phonenumber:","plate_number:","entry:");  console.log("id:","phonenumber:","plate_number:","entry:");




        
    })
    fastify.get('/dadd', {}, async function (request, reply) {
        try {
            const {rows} = await client.query('SELECT * FROM add')
            console.log(rows)
            reply.send(rows)
        } catch(err) {
            throw new Error(err)
        }
    })

    fastify.get('/car/:1',{schema:car}, async function  (request, reply) {

        try{
            //console.log($1);debugger
            const {rows} = await client.query('SELECT *from exit where id = $1;', [request.params.id])
                console.log(rows)
        
                reply.send(rows)
        } catch(err) {
                throw new Error(err)
            }
        })



        fastify.get('/avalable/:plate_number',{schema:avalable}, async function  (request, reply) {

            try{
                //console.log($1);debugger
                const {rows} = await client.query('SELECT * FROM avalable WHERE plate_number = $1', [request.params.plate_number])
                    console.log(rows)
            
                    reply.send(rows)
            } catch(err) {
                    throw new Error(err)
                }
            })



            ///today

        fastify.get('/today/:date',{schema:gettoday}, async function  (request, reply) {

            try{
                //console.log($1);debugger
                const {rows} = await client.query('SELECT * FROM master14 WHERE date = $1', [request.params.date])
                    console.log(rows)
            
                    reply.send(rows)
            } catch(err) {
                    throw new Error(err)
                }
                console.log("id:","date:","total:");
                console.log("id:","date:","total:");
            })

           
            
            
            fastify.get('/vehicle22', {}, async function (request, reply) {
                try {
                    const {rows} = await client.query('select * from vehicle ')
                    console.log(rows)
                    reply.send(rows)
                } catch(err) {
                    throw new Error(err)
                }
            //     console .log("vechicle_type:2"
            // ,"plate_number:TN11AY4671","phone_number:7824045704","entry:03:10:00","exit:04:10:00","amount:40",);
            // console.log("vechicle_type:1","plate_number:TN11AY5656","phonenumber:123456789","entry:11:45:00","exit:12:30","amount:50");
            // console.log("vechicle_type:1","phone_number:123456789","plate_number:TN11AY5656","entry:10.30:00","exit:11:45:00","amount:120");
            // console.log("vechicle_type:2","phone_number:7824045704","plate_number:TN11AY4671","entry:10:00:00","exit:11:45:00","amount:50");
            // console.log("vechicle_type:2","phonenumber:7824045704","plate_number:TN11AY4671","enity:10:00:00","exit:01:45:00","amount:130");
            })

            fastify.get('/admin1', {}, async function (request, reply) {
                try {
                    const {rows} = await client.query('SELECT * FROM admin1 ORDER BY id ASC')
                    console.log(rows)
                    reply.send(rows)
                } catch(err) {
                    throw new Error(err)
                }
            })


            fastify.post('/login', async (request, reply) => {
                const { name, password } = request.body
                const { rows } = await client.query(`SELECT * FROM pas WHERE name = '${name}' AND password = '${password}'`)
                
                if (rows.length === 0) {
                  reply.status(401).send({ message: 'Invalid name or password' })
                } else {
                  const token = fastify.jwt.sign({ pass: rows[0] })
                  reply.send({ token })
                }
              })
            //   fastify.get('/secure', { preHandler: fastify.jwt.verify }, async (request, reply) => {
            //     reply.send({ message: 'Access granted' })
            //   })
            fastify.get('/secure', { preHandler: fastify.jwt.verify }, async (request, reply) => {
                reply.send({ message: 'Access granted' })
              })
        
          
}
module.exports= routes