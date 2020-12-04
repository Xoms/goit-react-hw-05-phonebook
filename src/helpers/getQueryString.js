import qs from 'query-string';

export default function getQueryString(locationSearch){
    return qs.parse(locationSearch);
} 
