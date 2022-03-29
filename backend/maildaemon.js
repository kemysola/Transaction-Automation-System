const nodemailer = require("nodemailer");

const maildaemonEmail = process.env.maildaemonEmail
const maildaemonPassword = process.env.maildaemonPassword

// To set up an SMTP connection, we have to create atransporter object, by calling nodemailer’s createTransport function
const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: maildaemonEmail,
      pass: maildaemonPassword,
    },
  });
  

module.exports.sendConfirmationEmail = (name, email, confirmationCode, otp, username) => {
transport.sendMail({
    from: name,
    to: email,
    subject: "Welcome to InfraCredit Transaction Reporting System",
    // html: `<h2>Account Activation</h2>
    //     <h3>Hello ${username}</h3>
    //     <p>You have now been successfully setup on the Transaction Reporting System.</p>
    //     <p>Please confirm your email by clicking on the following link <a href=http://localhost:5001/api/v1/staff/confirm/${confirmationCode}> Click here</a> </p>
    //     <p>Please login with your Email: ${email} with One-Time-Password: <strong> ${otp} </strong> Note: Activation Link will expire in 24 hours</p>
    //     </div>`,
    html: `<html>

    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <script src="https://use.fontawesome.com/70cc357c22.js"></script>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" type="text/css" />
      <!--<![endif]-->
      <style>
        * {
          box-sizing: border-box;
        }
    
        body {
          margin: 0;
          padding: 0;
        }
    
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
    
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
    
        p {
          line-height: inherit
        }
    
        @media (max-width:700px) {
          .icons-inner {
            text-align: center;
          }
    
          .icons-inner td {
            margin: 0 auto;
          }
    
          .row-content {
            width: 100% !important;
          }
    
          .column .border {
            display: none;
          }
    
          .stack .column {
            width: 100%;
            display: block;
          }
        }
      </style>
    </head>
    
    <body style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9;" width="100%">
        <tbody>
          <tr>
            <td>
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                  <tr>
                    <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                        class="row-content stack" role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5d77a9; color: #000000; width: 680px;"
                        width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                              width="100%">
                              <table border="0" cellpadding="0" cellspacing="0"
                                class="image_block" role="presentation"
                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                width="100%">
                                <tr>
                                  <td
                                    style="padding-bottom:10px;padding-top:10px;width:100%;padding-right:0px;padding-left:0px;">
                                    <div align="center" style="line-height:10px"><img
                                        alt="InfraCredit Logo"
                                        src="images/Yourlogo-light.png"
                                        style="display: block; height: auto; border: 0; width: 268px; max-width: 100%;"
                                        title="Yourlogo Light" width="268" /></div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                  <tr>
                    <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                        class="row-content stack" role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #cbdbef; color: #000000; width: 680px;"
                        width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 20px; padding-bottom: 20px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                              width="100%">
                              <table border="0" cellpadding="0" cellspacing="0"
                                class="image_block" role="presentation"
                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                width="100%">
                                <tr>
                                  <td
                                    style="width:100%;padding-right:0px;padding-left:0px;padding-top:70px;">
                                    <div align="center" style="line-height:10px"><i
                                        class="fa fa-check-circle"
                                        aria-hidden="true"></i></div>
                                  </td>
                                </tr>
                              </table>
                              <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                role="presentation"
                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                width="100%">
                                <tr>
                                  <td
                                    style="padding-bottom:25px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                    <div
                                      style="font-family: Georgia, 'Times New Roman', serif">
                                      <div
                                        style="font-size: 14px; font-family: Georgia, Times, 'Times New Roman', serif; mso-line-height-alt: 16.8px; color: #2f2f2f; line-height: 1.2;">
                                        <p
                                          style="margin: 0; font-size: 14px; text-align: center;">
                                          <span style="font-size:42px;">Account
                                            Activation</span></p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                role="presentation"
                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                width="100%">
                                <tr>
                                  <td
                                    style="padding-bottom:80px;padding-left:30px;padding-right:30px;padding-top:10px;">
                                    <div style="font-family: sans-serif">
                                      <div
                                        style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #2f2f2f; line-height: 1.5;">
                                        <p
                                          style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 24px;">
                                          <span style="font-size:16px;">Hi
                                            <strong><u>${username}</u></strong>,</span>
                                        </p>
                                        <p
                                          style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;">
                                           </p>
                                        <p
                                          style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 24px;">
                                          <span style="font-size:16px;">You have now
                                            been successfully setup on the
                                            Transaction Reporting System. </span>
                                        </p>
    
                                        <p
                                          style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 24px;">
                                          <span style="font-size:16px;">Please confirm
                                            your email by clicking on the following
                                            link <a
                                              href=http://localhost:5001/api/v1/staff/confirm/${confirmationCode}>
                                              Click here</a> </span></p>
    
                                        <p
                                          style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 24px;">
                                          <span style="font-size:16px;">Please login
                                            with your Email: ${email} with
                                            One-Time-Password: <strong> ${otp}
                                            </strong> Note: Activation Link will
                                            expire in 24 hours </span></p>
    
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3"
                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                  <tr>
                    <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                        class="row-content stack" role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5d77a9; color: #000000; width: 680px;"
                        width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                              width="100%">
                              <table border="0" cellpadding="0" cellspacing="0"
                                class="image_block" role="presentation"
                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                width="100%">
                                <tr>
                                  <td
                                    style="width:100%;padding-right:0px;padding-left:0px;padding-top:20px;">
                                    <div align="center" style="line-height:10px"><img
                                        alt="InfraCredit Logo"
                                        src="images/Yourlogo-light.png"
                                        style="display: block; height: auto; border: 0; width: 204px; max-width: 100%;"
                                        title="Yourlogo Light" width="204" /></div>
                                  </td>
                                </tr>
                              </table>
                              <table border="0" cellpadding="10" cellspacing="0"
                                class="social_block" role="presentation"
                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                width="100%">
                                <tr>
                                  <td>
                                    <table align="center" border="0" cellpadding="0"
                                      cellspacing="0" class="social-table"
                                      role="presentation"
                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                      width="108px">
                                      <tr>
                                        <td style="padding:0 2px 0 2px;"><i
                                            class="fa fa-facebook-official"
                                            aria-hidden="true"></i><a
                                            href="https://www.facebook.com/"
                                            target="_blank"></a></td>
                                        <td style="padding:0 2px 0 2px;"><i
                                            class="fa fa-twitter"
                                            aria-hidden="true"></i><a
                                            href="https://twitter.com/"
                                            target="_blank"></a></td>
                                        <td style="padding:0 2px 0 2px;"><i
                                            class="fa fa-instagram"
                                            aria-hidden="true"></i><a
                                            href="https://instagram.com/"
                                            target="_blank"></a></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                              <table border="0" cellpadding="10" cellspacing="0"
                                class="text_block" role="presentation"
                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                width="100%">
                                <tr>
                                  <td>
                                    <div style="font-family: sans-serif">
                                      <div
                                        style="font-size: 14px; mso-line-height-alt: 21px; color: #f9f9f9; line-height: 1.5; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                        <p
                                          style="margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 18px;">
                                          <span style="font-size:12px;">InfraCredit
                                            Address</span></p>
                                        <p
                                          style="margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 18px;">
                                          <span
                                            style="font-size:12px;">enquiry@infracredit.com
                                          </span></p>
                                        <p
                                          style="margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 18px;">
                                          <span style="font-size:12px;">(+234) 123 456
                                            789</span></p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4"
                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                  <tr>
                    <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                        class="row-content stack" role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5d77a9; color: #000000; width: 680px;"
                        width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 20px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                              width="100%">
                              <table border="0" cellpadding="10" cellspacing="0"
                                class="text_block" role="presentation"
                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                width="100%">
                                <tr>
                                  <td>
                                    <div style="font-family: sans-serif">
                                      <div
                                        style="font-size: 12px; mso-line-height-alt: 14.399999999999999px; color: #cfceca; line-height: 1.2; font-family: Arial, Helvetica Neue, Helvetica, sans-serif;">
                                        <p
                                          style="margin: 0; font-size: 14px; text-align: center;">
                                          <span style="font-size:12px;">2021 © All
                                            Rights Reserved</span></p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5"
                role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                  <tr>
                    <td>
                      <table align="center" border="0" cellpadding="0" cellspacing="0"
                        class="row-content stack" role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;"
                        width="680">
                        <tbody>
                          <tr>
                            <td class="column column-1"
                              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                              width="100%">
                              <table border="0" cellpadding="0" cellspacing="0"
                                class="icons_block" role="presentation"
                                style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                width="100%">
                                <tr>
                                  <td
                                    style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                    <table cellpadding="0" cellspacing="0"
                                      role="presentation"
                                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                      width="100%">
                                      <tr>
                                        <td
                                          style="vertical-align: middle; text-align: center;">
    
                                          <table cellpadding="0" cellspacing="0"
                                            class="icons-inner" role="presentation"
                                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
                                            <!--<![endif]-->
                                            <tr>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table><!-- End -->
    </body>
    
    </html>`
}).catch(err => console.log(err));
};