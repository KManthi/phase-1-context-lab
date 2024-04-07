function createEmployeeRecord(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents:[],
        timeOutEvents: []

    }
}

function createEmployeeRecords (employeeRowData) {
    return employeeRowData.map((row) => {
        return createEmployeeRecord(row);
    });
}

function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    })

    return this;
}

function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    })

    return this;
}

function hoursWorkedOnDate(date) {

    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);

    return (timeOutEvent.hour-timeInEvent.hour)/100;   
}

function wagesEarnedOnDate(date) {

    let payOwed = hoursWorkedOnDate.call(this,date) * this.payPerHour;

    return payOwed;    
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(records => {
        return records.firstName === firstName
    })
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function (memo, records) {
        return memo + allWagesFor.call(records)
    }, 0);
}
