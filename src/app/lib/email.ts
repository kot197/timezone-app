import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'timezone.webapp@gmail.com',
        pass: 'nvdtxfmtboytopks'
    }
});

export async function sendVerificationCode(email:string, code:string) {
    console.log("inside sendVerificationCode");
    const message = {
        from: "timezone.webapp@gmail.com",
        to: email,
        subject: "Verify Your Email to Start Using Timezone App",
        text: "Your verification code: " + code,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email</title>
        </head>
        <body style="background-color: #f7fafc; padding: 16px;">
        <div style="max-width: 28rem; margin: auto; background-color: #ffffff; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); border-radius: 0.5rem; padding: 24px;">
            <h1 style="font-size: 1.5rem; font-weight: 700; color: #3182ce;">Hello from Tailwind CSS</h1>
            <p style="color: #4a5568; margin-top: 16px;">
            This email is styled using Tailwind CSS, but the styles have been inlined for compatibility with most email clients.
            ${code}
            </p>
        </div>
        </body>
        </html>`
    }

    transporter.sendMail(message, (error) => {
        if(error) {
            return console.log(error);
        }
    });
}

// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
});