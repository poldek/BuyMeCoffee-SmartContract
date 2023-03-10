import moment from 'moment';

const convertToHumanDate = (timestamp) => {
    let convertToDateTime = moment.unix(timestamp).format('dddd, MMMM Do, YYYY H:mm:ss A');
    return convertToDateTime;   
}

export default convertToHumanDate;