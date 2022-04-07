var timeDisplayEl = $('#time-display')
const HOUR_OFFSET = 9

displayTime()
function setEvent(rows, i) {
    let eventCell = rows.eq(i).find(".event")
        let rowHour = i+HOUR_OFFSET

        if (moment().hours() > rowHour) {
            eventCell.addClass("bg-secondary")
        } else if (moment().hours() === rowHour) {
            eventCell.addClass("bg-danger")
        } else {
            eventCell.addClass("bg-success")
        }
}

function setTime(rows, i) {
    let timeCell = rows.eq(i).find(".time")
    let time = moment().set("hours", i+HOUR_OFFSET)
    timeCell.text(time.format('h a'))
}

function displayTime() {
    let currentTime = moment().format('MMM DD, YYYY [at] hh:mm:ss a')
    timeDisplayEl.text(currentTime)
    let rows = $('#schedule').children(".row")
    rows.each(function(i) {
        setTime(rows, i)
        setEvent(rows, i)
    })
}
setInterval(displayTime,100000000)

