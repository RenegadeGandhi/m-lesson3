// we use pg library to
// request connection pool from postgres database
// psql -h traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com -d postgres -U traineeUser password is traineePassword
const { Pool } = require('pg')

// we connect to pg using pool we requested
const pool = new Pool({
  user: 'traineeUser',
  host: 'traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com',
  password: 'traineePassword',
  database: 'postgres',
  port: 5432,
  multipleStatements: true
})

// the pool emits an error on behalf of any idle clients
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// if no error on idel client, pool connects to database
pool.connect((err, client, done) => {
    //if there is an error with our database connection strings
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    //if no error then we have successfully connected 
    console.log('Connected to database');
    // do not call done(); - because we want to use this connection 
    // to create/insert/delete or select records from our database
    // sometime we might also want to export this connection for other resources
});

// insert a record into our table
pool.query(
    `INSERT INTO TeamOludare2021 
                 (ID, NAME, AGE, DEPARTMENT, ROLE, STATUS, CREATEED_DT)
                 VALUES 
                 ('1', 'Sarah', '5', 'Accounting', 'PM' , 'Activated', '2020-01-01'),
                 ('2', 'Tim', '10', 'Engineerimg', 'QA' , 'Pending', '2020-01-02'),
                 ('3', 'Joe', '17', 'Management', 'PM' , 'Activated', '2020-01-02'),
                 ('4', 'Tolu', '25', 'Management', 'Dev' , 'Pending', '2020-01-02'),
                 ('5', 'Rob', '5', 'Engineerimg', 'QA' , 'Activated', '2020-01-03'),
                 ('6', 'Ade', '10', 'Management', 'QA' , 'Pending', '2020-01-04'),
                 ('7', 'Tom', '17', 'Security', 'QA' , 'Activated', '2020-01-05'),
                 ('8', 'Jide', '26', 'Accounting', 'Dev' , 'Activated', '2020-01-06')
                 `,
    (err, res) => {
      if(err) {
        console.log('Error or issue with table creation');
    } else {
        console.log('Inserted data into table successfully')
        console.log(res);
   }
  } 
);

pool.end();


// export connection
module.exports = pool;