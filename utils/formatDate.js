export default function formatDate(date) {
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let year = date.slice(0, 4);
    let hour = Number(date.slice(11, 13)) % 12;
    let minutes = date.slice(14, 16)
    return month + '/' + day + '/' + year + ' ' + hour + ':' + minutes;
}