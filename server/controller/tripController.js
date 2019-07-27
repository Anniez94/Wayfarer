import client from "../config/database";
let decoded;

// Get All Trips
exports.getAllTrips = (req, res, next) => {
    client.query('SELECT * FROM trip', (err, result) => {
        if (err)
            return res.status(400).json({
                status: 400,
                error: err,
            });
        if (result.rows.length < 1)
            return res.status(200).json({
                status: 200,
                data: "No trips available"
            });
        res.status(200).json({
            status: 200,
            data: { "result": result.rows }
        });

    });
}

// Register Trip (Only Admin can create a trip)
exports.postTrip = (req, res, next) => {
     decoded = req.userData;
    client.query('SELECT is_admin FROM users WHERE id=$1', [decoded.data.userId], (err, result) => {
        if (result.rows[0].is_admin === false)
            return res.status(404).json({
                status: 'Failed',
                message: 'User is not an admin',
            });
        if (result.rows[0].is_admin === true) {
            const { bus_id, origin, destination, trip_date, fare, status } = req.body
            if (!bus_id || !origin || !destination || !trip_date || !fare)
                return res.status(400).json({
                    status: 400,
                    data: [{
                        error: "Bad request",
                        message: "All fields are required",
                    }]
                });
            client.query('Select id FROM buses WHERE id = $1', [bus_id], (err, result) => {
                if (result.rows < 1)
                    return res.status(400).json({
                        error: "Failed",
                        mesage: "Bus doesn't exist"
                    });
                const trip = [
                    bus_id,
                    origin,
                    destination,
                    trip_date,
                    fare,
                    status
                ]
                client.query("INSERT INTO trip(bus_id, origin, destination, trip_date, fare, status) VALUES($1, $2, $3, $4, $5, $6)", trip, (err, result) => {
                    if (err)
                        return res.status(400).json({
                            status: 400,
                            error: 'Error with entry',
                        });
                    res.status(200).json({
                        status: 200,
                        data: [{
                            message: 'trip registered sucessfully'
                        }]
                    });
                });
            });
        }
    });

}

// Cancel Trip
exports.deleteTrip = (req, res, next) => {
     decoded = req.userData;
    client.query('SELECT is_admin FROM users WHERE id=$1', [decoded.data.userId], (err, result) => {
        if (result.rows[0].is_admin === false)
            return res.status(404).json({
                status: 'Failed',
                message: 'User is not an admin',
            });
        if (result.rows[0].is_admin === true) {
            client.query('DELETE FROM Trip WHERE id = $1', [req.params.id], (error, results) => {
                if (error)
                    return res.status(400).json({
                        status: 400,
                        data: [{
                            message: " Failed Bad request"
                        }]
                    })
                res.status(200).json({
                    status: 200,
                    data: [{
                        message: " Success Trip deleted"
                    }]
                })
            });
        }
    });
};

