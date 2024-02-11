const fs = require('fs');

const fetchAppliedInternships = (userId) => {
    var users = _getUserJSON();
    var foundUser = users.filter(function(user) {
      return user.userId==userId;
    })[0];
    return foundUser.appliedInternships;
};

const applyInternship = (userId, internshipId) => {
    var users = _getUserJSON();
    var foundUser = users.filter(function(user) {
      return user.userId==userId;
    })[0];
    console.log(foundUser);
    foundUser.appliedInternships.push(internshipId);
    var usersWithoutCurrentUser = users.filter(function(user) {
        return user.userId!=userId;
      });
      usersWithoutCurrentUser.push(foundUser);

    //console.log(foundUser);
    _writeUserJSON(usersWithoutCurrentUser);
    //return foundUser.appliedInternships;
};

const _writeUserJSON = (usersInfo) => {
    fs.writeFileSync('/workspaces/InternOO/db/user-list.json', JSON.stringify(usersInfo), 'utf-8');
}

const _getUserJSON = () => {
    var fileResponse = fs.readFileSync('/workspaces/InternOO/db/user-list.json', 'utf-8');
    return JSON.parse(fileResponse);
}

module.exports.fetchAppliedInternships = fetchAppliedInternships;
module.exports.applyInternship = applyInternship;