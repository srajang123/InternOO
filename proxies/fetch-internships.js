const fs = require('fs');

const fetchInternships = () => {
    var fileResponse = fs.readFileSync('/workspaces/InternOO/proxies/internship-list.json', 'utf-8');
    return JSON.parse(fileResponse);
};

module.exports.fetchInternships = fetchInternships;