const fs = require('fs');
const axios = require("axios");
const cheerio = require("cheerio");


async function fetchInternships(){
    var url = 'https://internshala.com/internships/computer-science-internship/';
    const { data } = await axios.get(url);
    const htmlData = cheerio.load(data);
    var internships = [];
    htmlData('.individual_internship').each((idx, element) => {
        var internshipMetadata = htmlData(element).children('.internship_meta');
        var intern = {
            "id":element.attribs.internshipid,
            "role": _getProfileName(htmlData, internshipMetadata),
            "company": {
              "name": _getCompanyName(htmlData, internshipMetadata),
              "logo": ""
            },
            "stipend": _getStipend(htmlData, internshipMetadata),
            "duration": _getDuration(htmlData, internshipMetadata)
          };
          internships.push(intern);
    })
    return internships;
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
 
const _getDuration = (htmlData, internshipMetadata) => {
    var bb = htmlData(internshipMetadata).children('.individual_internship_details');
    var cc = htmlData(bb).children('.internship_other_details_container');
    
    var dd = htmlData(cc).children('.other_detail_item_row');
    var ee = htmlData(dd).children('.other_detail_item')[1];
    var ff = htmlData(ee).children('.item_body');
    //var gg = htmlData(ff).children('.stipend');
    return ff.text().trim();
}

const _getStipend = (htmlData, internshipMetadata) => {
    var bb = htmlData(internshipMetadata).children('.individual_internship_details');
    var cc = htmlData(bb).children('.internship_other_details_container');
    
    var dd = htmlData(cc).children('.other_detail_item_row');
    var ee = htmlData(dd).children('.stipend_container');
    var ff = htmlData(ee).children('.item_body');
    var gg = htmlData(ff).children('.stipend');
    return gg.text().trim();
}

const _getCompanyName = (htmlData, internshipMetadata) => {
    var bb = htmlData(internshipMetadata).children('.individual_internship_header');
    var cc = htmlData(bb).children('.company');
    
    var dd = htmlData(cc).children('.company_name');
    var ee = htmlData(dd).children('.company_and_premium');
    var ff = htmlData(ee).children('.link_display_like_text');
    return ff.text().trim();
}

const _getProfileName = (htmlData, internshipMetadata) => {
    var bb = htmlData(internshipMetadata).children('.individual_internship_header');
    var cc = htmlData(bb).children('.company');
    
    var dd = htmlData(cc).children('.profile');
    var ee = htmlData(dd).children('.view_detail_button');
    return ee.text().trim();
}

module.exports.fetchInternships = fetchInternships;
module.exports.fetchInternshipInformation = fetchInternshipInformation;