let timeDisplayEl = $('#time-display')
let saveBtn = document.querySelector("#saveBtn")
let description = document.querySelector("#event")
let rows = $('#schedule').children(".row")
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
    rows.each(function(i) {
        setTime(rows, i)
        setEvent(rows, i)
    })
}
setInterval(displayTime,1000)

rows.each(function(i) {
    let eventCell = rows.eq(i).find(".event")
    let saveBtn = rows.eq(i).find(".saveBtn")
    renderDescription(i)

    saveBtn.on("click", function(event) {
        event.preventDefault();

        let description = eventCell.text()

        if (description !== "") {
            localStorage.setItem(`description${i}`, description)
            renderDescription(i);
        }
    })
})

function renderDescription(i) {
    let description = localStorage.getItem(`description${i}`)
    if (!description) {
        description = ""
    }
    let eventCell = rows.eq(i).find(".event")
    eventCell.text(description)
}