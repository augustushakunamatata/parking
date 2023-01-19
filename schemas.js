 const addusers = {
    response: {
        201: {
    body: {

        type: 'object',
        required: ['user_id','phonenumber','name','password'],
        properties: {
            name: {type: 'string'},
            phonenumber:{type:'string'},
            user_id:{type:'string'},
            password:{type:'string'}
           
        }
    }
}
    }}
    const updateusers = {
        body: {
            type: 'object',
            properties: {
                name: {type: 'string'},
                
           
                
            }
        },
        params: {
            type: 'object',
            properties: {
              phonenumber: { type: 'string'},
              
            }
        }
    }
    const deleteusers = {
    
        params: {
            type: 'object',
            properties: {
                id: {type:'string'}
            }
        }
    }

    const addvechicle = {
        response: {
            201: {
        body: {
    
            type: 'object',
            required: ['vechicle_id','plate_number','vechicle_type'],
            properties: {
                vechicle_id: {type: 'string'},
                plate_number:{type:'string'},
               
              
              
                vechicle_type:{type:'string'}
            }
        }
    }
        }
    
    }
    const updatevechicle = {
        body: {
            type: 'object',
            properties: {
                plate_number: {type: 'string'},
                vechicle_type:{type:'string'}
                
            }
        },
        params: {
            type: 'object',
            properties: {
              vechicle_id: { type: 'string'}
            }
        }
    }
    const deletevechicle = {
        
        params: {
            type: 'object',
            properties: {
                vechicle_id: {type:'string'}
            }
        }
    }
    

    // const addvalidatephonenumber = {
    //     response: {
    //         201: {
    //     body: {
    
    //         type: 'object',
    //         required: ['phonenumber'],
    //         properties: {
               
    //             user_id:{type:'string'},
               
    //         }
    //     }
    // }
    //     }
    
    // }
    const addparking = {
        response: {
            201: {
        body: {
    
            type: 'object',
            required: ['parking_id','parking_date','date_checkin','date_checkout','parking_place','gate_in','gate_out','total_number_of_car','total_number_of_bike','parking_history'],
            properties: {
                parking_id: {type: 'string'},
                parking_date:{type:'string'},
                date_checkin:{type:'string'},
                date_checkout:{type:'string'},
                parking_place:{type:'string'},
                gate_in:{type:'string'},
                gate_out:{type:'string'},
                total_number_of_car:{type:'string'},
                total_number_of_bike:{type:'string'},
                parking_history:{type:'string'}
               
            }
        }
    }
}
    }
    const updateparking = {
        body: {
            type: 'object',
            properties: {
                parking_date:{type:'string'},
                date_checkin:{type:'string'},
                date_checkout:{type:'string'},
                parking_place:{type:'string'},
              
                gate_in:{type:'string'},
                gate_out:{type:'string'},
                total_number_of_car:{type:'string'},
                total_number_of_bike:{type:'string'},
                parking_history:{type:'string'}
               
                
            }
        },
        params: {
            type: 'object',
            properties: {
              parking_id: { type: 'string'}
            }
        }
    }

    const deleteparking = {
        
        params: {
            type: 'object',
            properties: {
                parking_id: {type:'string'}
            }
        }
    }
    
    const addparking_section_area = {
        response: {
            201: {
        body: {
    
            type: 'object',
            required: ['parking_section_id','parking_section_area','capacity'],
            properties: {
                parking_section_id: {type: 'string'},
                parking_section_area:{type:'string'},
                capacity:{type:'string'}
               
              
              
               
            }
        }
    }
        }
    
    }
    const updateparking_section_area = {
        body: {
            type: 'object',
            properties: {
                parking_section_area: {type: 'string'},
                capacity:{type:'string'}
                
            }
        },
        params: {
            type: 'object',
            properties: {
              parking_section_id: { type: 'string'}
            }
        }
    }
    const deleteparking_section_area= {
        
        params: {
            type: 'object',
            properties: {
                parking_section_area_id: {type:'string'}
            }
        }
    }



    
        const addparking_system = {
        response: {
            201: {
        body: {
    
            type: 'object',
            required: ['parking_system_id','parking_code','total_collection','collection_for_car','collection_for_bike'],
            properties: {
                parking_system_id: {type: 'string'},
                parking_code:{type:'string'},
                total_collection:{type:'string'},
                collection_for_car:{type:'string'},
                collection_for_bike:{type:'string'}
               
              
              
               
            }
        }
    }
        }
    
    }


    const updateparking_system = {
        body: {
            type: 'object',
            properties: {
                total_collection: {type: 'string'},
                collection_for_car:{type:'string'},
                collection_for_bike:{type:'string'},
                
            }
        },
        params: {
            type: 'object',
            properties: {
              parking_system_id: { type: 'string'}
            }
        }
    }
   

    const addhours = {
        response: {
            201: {
        body: {
    
            type: 'object',
            required: ['hours_id'],
            properties: {
               hours_id:{type:'string'},
               parking_price_by_hours:{type:'string'}
            }
        }
    }
}
}
const addmap = {
    response: {
        201: {
    body: {

        type: 'object',
        required: ['map_id'],
        properties: {
           map_id:{type:'string'},
           
        }
    }
}
}
}



const adddetails = {
    response: {
        201: {
    body: {

        type: 'object',
        required: ['user_id','phonenumber','vechicle_type','plate_number','parking_date','time_checkin','time_checkout'],
        properties: {
            user_id: {type: 'string'},
            phonenumber:{type:'string'},
            vechicle_type:{type:'string'},
            parking_date:{type:'string'},
            time_checkout:{type:'string'},
            time_checkin:{type:'string'},
            name:{type:'string'},
            plate_number:{type:'string'}
           
          
          
           
        }
    }
}
    }

}
const exit= {
        
    params: {
        type: 'object',
        properties: {
            plate_number: {type:'string'}
        }
    }
}


// const addvechicles = {
//     response: {
//         201: {
//     body: {

//         type: 'object',
//         required: ['id','plate_number','phone_number','time','date'],
//         properties: {
//             id: {type: 'string'},
//             plate_number:{type:'string'},
//             phone_number:{type:'string'},
           
//             // date:{type:'string'}
           
          
          
           
//         }
//     }
// }
//     }

// }
const addusers1 = {
    response: {
        201: {
    body: {

        type: 'object',
        required: ['id','phonenumber','platenumber'],
        properties: {
            id: {type: 'string'},
            phone_number:{type:'string'},
            platenumber:{type:'string'}
           
          
          
           
        }
    }
}
    }

}




const car= {
        
    params: {
        type: 'object',
        properties: {
            id: {type:'id'}
        }
    }
}



const avalable= {
        
    params: {
        type: 'object',
        properties: {
        plate_number: {type:'plate_number'}
        }
    }
}



const gettoday= {
        
    params: {
        type: 'object',
        properties: {
        date: {type:'date'}
        }
    }
}

const loginSchema = {
    body: {
      type: 'object',
      properties: {
        admin:{type:'string'},
        email: { type: 'string' },
        password: { type: 'string' }
      },
      required: ['email', 'password']
    }
  }