import client from "../config/database";
let decoded;

// Register Bus
exports.postBus = (req, res, next) => {
    decoded = req.userData;
    client.query('SELECT is_admin FROM users WHERE id=$1', [decoded.data.userId], (err, result) => {
        if (result.rows[0].is_admin === false)
            return res.status(404).json({
                status: 'Failed',
                message: 'User is not an admin',
            });
        if (result.rows[0].is_admin === true) {
            let { number_plate, manufacturer, model, year, capacity } = req.body
            if (!number_plate || !manufacturer || !model || !year || !capacity)
                return res.status("400").json({
                    status: "Bad request",
                    msg: "All fields are required"
                });
            client.query('SELECT * FROM buses WHERE number_plate = $1', [number_plate], (error, result) => {
                if (result.rows >= '1')
                    return res.status(409).json({
                        status: 'Failed',
                        message: 'conflict: Bus already registered',
                    });
                const bus = [
                    number_plate,
                    manufacturer,
                    model,
                    year,
                    capacity
                ]
                client.query("INSERT INTO buses(number_plate, manufacturer, model, year, capacity) VALUES($1, $2, $3, $4, $5)", bus, (error, result) => {
                    if (error)
                        return res.status(400).json({
                            status: false,
                            data: 'there are some error with query',
                        });
                    res.json({
                        status: "success",
                        data: result.rows[0]
                    });
                });
            });
        }
    });
};

// Get all buses
exports.getAllBuses = (req, res, next) => {
    decoded = req.userData;
    client.query('SELECT is_admin FROM users WHERE id=$1', [decoded.data.userId], (err, result) => {
        if (result.rows[0].is_admin === false)
            return res.status(404).json({
                status: 'Failed',
                message: 'User is not an admin',
            });
        if (result.rows[0].is_admin === true) {

            client.query('SELECT * FROM buses', (err, result) => {
                if (err)
                    return res.status(400).json({
                        status: 400,
                        error: err,
                    });
                if (result.rows.length < 1)
                    return res.status(200).json({
                        status: 200,
                        data: "No Bus Available"
                    });
                res.status(200).json({
                    status: 200,
                    data: { "result": result.rows }
                });

            });
        }
    });

}