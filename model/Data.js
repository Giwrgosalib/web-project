exports.User=function(id,email,Name,Password,RegDate,Date_of_birth,Address,Phone,Mobile,Role){
    this.id=id;
    this.email=email;
    this.Name=Name;
    this.Date_of_birth=Date_of_birth;
    this.Password=Password;
    this.RegDate=RegDate;
    this.Address=Address;
    this.Phone=Phone;
    this.Mobile=Mobile;
    this.Role=Role;
}

exports.Coach=function (id,Name,Phone,Birthdate,availability){
    this.id=id;
    this.Name=Name;
    this.Phone=Phone;
    this.Birthdate=Birthdate;
    this.availability=availability;
}

exports.Reservation=function (id, date,start_time,UserId,CoachId,CourtId,CourtType , is_past){
    this.id=id;
    this.date=date;
    this.start_time=start_time;
    this.UserId=UserId;
    this.CoachId=CoachId;
    this.CourtId=CourtId;
    this.CourtType=CourtType;
    this.is_past=is_past;
}

exports.Court=function (id,Type,Availability){
    this.id=id;
    this.Type=Type;
    this.Availability=Availability;
}