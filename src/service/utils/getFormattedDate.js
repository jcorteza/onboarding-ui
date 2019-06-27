const getFormattedDate = (dateOjbect) => {
    const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = dateOjbect.getMonth();
    const day = dateOjbect.getDate();
    const year = dateOjbect.getFullYear();
    return `${monthsArray[month]} ${day}`;
}

export default getFormattedDate;