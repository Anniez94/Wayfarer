<h2>WayFarer is a public bus transportation booking server. Required to develop the back-end API.</h2>

<h3>Server side hosted on Heroku</h3>
https://wayfarer-booking-chiedu.herokuapp.com/
<hr>

<h3>API documentation</h3>
https://wayfarer-booking-chiedu.herokuapp.com/api-doc/
<hr>

<h4>Here's are the available features:</h4>
<ul>
<li>User can sign up.</li>
<li>User can sign in.</li>
<li>Admin can create a trip.</li>
<li> Both Admin and Users can see all trips.</li>
<li> Users can book a seat on a trip.</li>
<li> View all bookings. An Admin can see all bookings, while user can see all of his/her bookings.</li>
<li> Users can delete their booking.</li>
<li> Admin can cancel a trip.</li>
<li> User can get and filter trips using trip destination.</li>
<li> User can get and filter trips using trip origin.</li>
<li> User can change seats after booking.</li>
</ul>
<hr>

<h3> API End Points</h3>
<table>
<thead>
<tr>
<th>HTTP VERB</th>
<th>END POINT</th>
<th>FUNCTIONALITY</th>
</tr>
</thead>
<tr>
<td>POST</td>
<td>/api/user/signup</td>
<td>Users signup</td>
</tr>

<tr>
<td>POST</td>
<td>/api/auth/signin</td>
<td>Users signin</td>
</tr>

<tr>
<td>POST</td>
<td>/api/trip</td>
<td>Admin creates Trip</td>
</tr>

<tr>
<td>POST</td>
<td>/api/bus</td>
<td>Admin creates Bus</td>
</tr>

<tr>
<td>POST</td>
<td>/api/booking</td>
<td>User books a seat on a trip</td>
</tr>

<tr>
<td>GET</td>
<td>/api/user/signup</td>
<td>Get signup page</td>
</tr>

<tr>
<td>GET</td>
<td>/api/trip</td>
<td>View all trips</td>
</tr>

<tr>
<td>GET</td>
<td>/api/booking</td>
<td>View all bookings</td>
</tr>

<tr>
<td>GET</td>
<td>/api/bus</td>
<td>View all buses</td>
</tr>

<tbody>
</tbody>

</table>
<p>https://wayfarer-booking-chiedu.herokuapp.com</p>

<h3>Installation</h3>
Clone this repository into your local machine:
<p>e.g git clone https://github.com/Anniez94/wayfarer</p>
<hr>
<h4>Install dependencies</h4>
<p>e.g npm install.</p>
<hr>
<h4>Start the application by running the start script.</h4>
<p>e.g npm start</p>
<hr>
<h4>Install postman to test all endpoints on port 5000.</h4>
Run Test
<p>e.g npm test</p>