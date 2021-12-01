module.exports.createNewAppointment = async (req,res,next)=>{
    let { doctor, date, organization, user, chamber, time } = req.body;
    if(!doctor || !date || !user || !chamber){
        return res.json({
            "statusCode": 400,
            "success": false,
            "message": "Doctor, user, date and chamber are required field"
        });
    }else{
        date = moment(date).format("YYYY-MM-DD");
        time = time ? moment(time).format('LT') : "";
        let appointmentCount = await Appointment.countDocuments({chamber: chamber, doctor: doctor, date: date});
        console.log(appointmentCount);
        if(appointmentCount>=req.body.maxCount){
            return res.json({
                "count": appointmentCount,
                "date": date,
                "time": time
            })
        }
        else{
            let newAppointment = new Appointment({
                date: date,
                time: time,
                organization: organization,
                doctor: doctor,
                user: user,
                patientName: req.body.patientName,
                patientEmail: req.body.patientEmail,
                patientNumber: req.body.patientNumber,
                chamber: chamber,
                isActive: true,
                isPaid: false,
                status: "new",
                charge: req.body.charge,
            });
            newAppointment.id = newAppointment._id;
            newAppointment = await newAppointment.save();
            return res.json({
                appointment: newAppointment
            });
        }
    }
}
