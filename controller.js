const { default: fastify } = require("fastify");

const getTimestamps = async (req, res) => {
  
    const { startDate } = req.query;
    const { endDate } = req.query;
    const query = format(
      `
      SELECT users geometry;`,
      
      startDate,
      endDate
    );
  
    const data = await db.query(query);
  
    if (data) {
      res.status(200).send(generateGeoData(data.rows));
    } else {
      res.status(400).send({
        data: 'No data',
        success: false,
      });
    }
  };

fastify.get('/post') = async (req, res) => {
    const {  } = req.query;
    const { latitude } = req.query;
    const query = format(
      `
      declare @t as time = gettime()

      declare @total as bigint
      select @total = entry(ss,@t) + 60 * exit(mi,@t) + 3600 * vechicle_id(hh,@t)
      
      select
       @t [Current Time],
       @total [Total Time in Seconds],
       (@total / 3600) [Total Time Hour Part],
       ((@total % 3600) / 60) [Total Time Minute Part],
       (@total % 60) [Total Time Second Part];`,
   
    )
};

function parkingamount() {           
  var parkingentry = parsevarchar(prompt(""));

  if (entry <= 1.0 && entry > 1) {
    var amount = entry * 1.0;
      console.log("Parking fee is $" + amount);
  }
  else if (entry <= 1) {
    console.log("There are no parking amount.");
  }
  else if (parkingentry > 4.0 && parkingentry <= 12) {
    var amount = 6.0;
    console.log("Parking fee is $" + amount);
  }
  else if (parkingentry > 24) {           
    var amount = parkingHours * 6.0 / 24;
    console.log("Parking fee is $" + amount);
  }                       
}