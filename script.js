// Import AWS SDK
var AWS = require("aws-sdk");
AWS.config.update({
  region: process.env.VUE_APP_MY_REGION,
  secretAccessKey: process.env.VUE_APP_SECRET_ACCESS_KEY,
  accessKeyId: process.env.VUE_APP_ACCESS_KEY_ID
});

// send bulk normal email
export const sendbulkemail = async item => {
  // send normal email
  var receipient = item.addresses;
  var title = item.title ? item.title : "";
  var content = item.content ? item.content : "";
  var subject = item.subject ? item.subject : "";
  var ses = new AWS.SES();
  var params = {
    Destination: {
      ToAddresses: receipient
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<div style="font-weight: 700; margin-bottom: 10px;">${title}</div><div>${content}</div> <a class="ulink" href="http://docs.aws.amazon.com/ses/latest/DeveloperGuide" target="_blank">Amazon SES Developer Guide</a>.`
        },
        Text: {
          Charset: "UTF-8",
          Data: `${content}`
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: `${subject}`
      }
    },
    Source: "siddharthsaxena@nexprt.com"
  };
  ses.sendEmail(params).promise();
};

// send bulk raw email
export const sendbulkRawemail = async item => {
  // 1. Email Content
  var ses = new AWS.SES();
  var sender = "siddharthsaxena@nexprt.com";
  var receipient = item.addresses;
  var title = item.title ? item.title : "";
  var content = item.content ? item.content : "";
  var subject = item.subject ? item.subject : "";
  var filename = JSON.stringify(item.attachment);
  var attachment = item.base64;
  // 1b. Email Raw Data
  // eslint-disable-next-line no-useless-escape
  var message = `From:${sender}\nTo:${receipient}\nSubject:${subject}\nContent-type: Multipart/Mixed; boundary=\"NextPart\"\n\n--NextPart\nContent-Type: text/html\n\n<html><body><div style="font-weight: bold; text-transform: uppercase; margin-bottom: 10px;">${title}</div><div>${content}</div><div style="margin-top: 2rem;"><span style="color: #AD1457">WORK</span><span style="color: #023e7d">BOOK</span></div><div style="color: grey; font-size: 10px;">Copyright © 2021 Jogevk Group Limited, All rights reserved.</div></body></html>\n\n--NextPart\nContent-Type: text/plain; name=${filename}\nContent-Description: ${item.attachment}\nContent-Disposition: attachment;filename=${filename}\nContent-Transfer-Encoding: base64\n\n${attachment}\n\n--NextPart--`;
  // 2a. Params (Email Object)
  // eslint-disable-next-line
  var params = {
    RawMessage: {
      Data: message
    },
    Destinations: receipient,
    Source: "siddharthsaxena@nexprt.com"
  };
  // send email
  ses.sendRawEmail(params).promise();
};

// sns to send email
// export const sendbulksms = async item => {
//   // subscribe the new numbers
//   await subscribenewusers(item.addresses)
//   var params = {
//     Message:
//       "TITLE:" +
//       "\n" +
//       item.title +
//       "\n\n" +
//       "SUBJECT:" +
//       " \n" +
//       item.subject +
//       "\n\n" +
//       "CONTENT:" +
//       "\n" +
//       item.contact +
//       "\n",
//     // subscription ARN
//     TopicArn: process.env.VUE_APP_SNS_ARN
//   };
//   new AWS.SNS({ apiVersion: "2010-03-31" }).publish(params).promise();
// };

// subscribe users in your aws sns Topic
// export const subscribenewusers = async item => {
//   item.forEach(e => {
//     var params = {
//       Protocol: "sms" /* required */,
//       TopicArn: process.env.VUE_APP_SNS_ARN /* required */,
//       Endpoint: `${e}`,
//       ReturnSubscriptionArn: true || false
//     };
//     new AWS.SNS({ apiVersion: "2010-03-31" }).subscribe(params).promise()
//   });
// };

// =========================================

// sort email addresses
export const sortsenderemail = item => {
  // this will hold our final items
  let array = [];
  // get the email and phone numbers and sort them
  const response = item.split(",");
  // loop through the response and check the validity of each email
  response.forEach(e => {
    let item = checkvalidityofemail(e);
    if (item === true) {
      // if email is valid send to array
      array.push(e.trim());
    }
  });
  // end
  // return array
  return array;
};

// sort phone numbers
// export const sortsenderphone = item => {
//   // this will hold our final items
//   let array = [];
//   // get the email and phone numbers and sort them
//   const response = item.split(",");
//   // loop through the response and check the validity of each email
//   response.forEach(e => {
//     let item = checkvalidityofphone(e);
//     if (item === true) {
//       // if email is valid send to array
//       array.push(e.trim());
//     }
//   });
//   // end
//   // return array
//   return array;
// };

// This function checks the format of an email
// Those that wont pass will be eliminated
const checkvalidityofemail = item => {
  // eslint-disable-next-line no-useless-escape
  let pattern = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
  return pattern.test(item);
};

// This function checks the format of a phone number
// Those that wont pass will be elimited
// const checkvalidityofphone = item => {
//   // eslint-disable-next-line prettier/prettier
//   let pattern = /^\+[1-9]\d{1,14}$/g;
//   return pattern.test(item);
// };
