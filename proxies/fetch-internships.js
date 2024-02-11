const fs = require('fs');

const fetchInternships = () => {
    return _readInternshipJSON();
};

const fetchInternshipInformation = (internshipId) => {
    return _readInternshipJSON().filter(function(internship) {
        return internship.id==internshipId;
      })[0];
};

const _readInternshipJSON = () => {
    var fileResponse = fs.readFileSync('/workspaces/InternOO/proxies/internship-list.json', 'utf-8');
    return JSON.parse(fileResponse);
}

module.exports.fetchInternships = fetchInternships;
module.exports.fetchInternshipInformation = fetchInternshipInformation;