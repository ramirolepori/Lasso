const querys = require('../src/lib/querys');


const header = [{'Authorization': 'Basic Yng6Yng'},
                {'Content-Type': 'application/x-www-form-urlencoded'}];
querys.qRequest('POST', 'https://iam.cloud.ibm.com/identity/token', 'string', header)