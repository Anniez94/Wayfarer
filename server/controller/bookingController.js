import client from "../config/database";
let decoded;

// Register Booking
exports.postBooking = (req, res, next) => {
    let { trip_id, user_id, booking_date } = req.body
    if (!trip_id || !user_id || !booking_date)
        return res.status(400).json({
            status: 400,
            data: [{
                error: "Bad request",
                message: "All fields are required"
            }]
        });
    if (user_id !== req.userData.data.userId)
        return res.status("400").json({
            status: "failed",
            data: [{
                error: "Bad request",
                message: "Wrong userId"
            }]
        });
    client.query('Select id FROM trip WHERE id = $1', [trip_id], (err, result) => {
        if (result.rows < 1)
            return res.status(400).json({
                error: "Failed",
                mesage: "Trip doesn't exist"
            });
        const booking = [
            trip_id,
            user_id,
            booking_date
        ]
        client.query("INSERT INTO booking(trip_id, user_id, booking_date) VALUES($1, $2, $3) RETURNING *", booking, (error, result) => {
            if (error)
                return res.status(400).json({
                    status: error,
                    data: 'there are some error with query',
                });
                res.status(200).json({
                    status: "success",
                    data: {
                       message: "Booking registered" ,
                        id: result.rows[0].id,
                       user_id: result.rows[0].user_id,
                       trip_id: result.rows[0].trip_id,
                       booking_date: result.rows[0].booking_date,
                       created_on: result.rows[0].created_on
                    }
             });
            
        });
    });
};

// Delete Booking
exports.deleteBooking = (req, res, next) => {
    decoded = req.userData;
    client.query('SELECT user_id FROM booking WHERE user_id=$1', [decoded.data.userId], (error, results) => {
        if (error) 
            return res.status(400).json({
                status: "Failed",
                data: error
            })
        if (!results.rows[0]) 
            return res.json({
                status: "Success",
                data: "No User found"
            })
        if (decoded.data.userId === results.rows[0].user_id) {
            client.query('Select id FROM booking WHERE id = $1', [req.params.id], (err, result) => {
                if (result.rows < 1)
                    return res.status(400).json({
                        status: 400,
                        data: [{
                            error: "Failed",
                            mesage: "Booking Id doesn't exist"
                        }]
                    });
                client.query('DELETE FROM booking WHERE id = $1', [req.params.id], (error, results) => {
                    if (error) 
                        return res.status(400).json({
                            status: 400,
                            data:[{
                                status: "Failed",
                                error
                            }]   
                        });
                        res.status(200).json({
                            status: "Success",
                            data: "Booking deleted successfully"
                        })
                });
            });
        }
    });
};

// Get all Bookings if admin || Get all bookings where user id === booking id
exports.getBooking = (req, res, next) => {
    decoded = req.userData;
    client.query('SELECT is_admin FROM users WHERE id=$1', [decoded.data.userId], (err, result) => {
        if (result.rows[0].is_admin === false) {
            client.query('SELECT * FROM booking WHERE id = $1', [decoded.data.userId], (error, results) => {
                if (error) 
                    return res.status(400).json({
                        status: 400,
                        data:[{
                            error,
                            mesage: "Failed"
                        }]
                    });
                    res.status(200).json({
                        data: results.rows
                    });
            });
        } else if (result.rows[0].is_admin === true) {
            client.query('SELECT * FROM booking ', (error, results) => {
                if (error) 
                    return res.status(400).json({
                        status: "Failed",
                        data: error
                    })
                    res.status(200).json({
                        status: 200,
                        data: [{
                            mesage: results.rows
                        }]
                    });
            });
        }
    })
};

