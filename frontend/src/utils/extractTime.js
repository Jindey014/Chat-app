export function extractTime(dateString) {
    const date = new Date(dateString)
    const hours = padZero(date.getHours())
    const minutes = padZero(date.getMinutes())
    return `${hours}:${minutes}`
}

//HELPER FUNCTION TO PAD THE SINGLE DIGIT NUMBERS WITH A LEADING ZERO

function padZero(number) {
    return number.toString().padStart(2, "0")
}