const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');

const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const userRoutes = require('./routes/userRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const majorRoutes = require('./routes/majorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const annualCourseRoutes = require('./routes/annualCourseRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(session({
  secret: 'b2e6f8c7-1a4d-4f9a-8e2c-7d3a9b5c2f1e',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.get('/', (req, res) => {
  res.send('Hello transfer server API');
});

const setupSwagger = require('./swaggerConfig');
setupSwagger(app);

app.use('/students', studentRoutes);
app.use('/annual-courses', annualCourseRoutes);
app.use('/faculties', facultyRoutes);
app.use('/users', userRoutes);
app.use('/subjects', subjectRoutes);
app.use('/majors', majorRoutes);
app.use('/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});