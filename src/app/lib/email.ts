import nodemailer from "nodemailer"
import htmlContent from '../../../public/veritficationCode.html'

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'chandler.orn@ethereal.email',
        pass: 'AGGTW6ew9NZPSxjz1H'
    }
});

export async function sendVerificationCode(email:string, code:string) {
    console.log("inside sendVerificationCode");

    const htmlContentWithCode = htmlContent.replace("{{verification_code}}", code);

    const message = {
        from: "timezone.webapp@gmail.com",
        to: email,
        subject: "Verify Your Email to Start Using Timezone App",
        text: "Your verification code: " + code,
        html: htmlContentWithCode
    }

    transporter.sendMail(message, (error) => {
        if(error) {
            return console.log(error);
        }
    });
}

export async function testVerificationCode(code: string) { 
    const htmlContentWithCode = htmlContent.replace("{{verification_code}}", code);

    const message = {
        from: "timezone.webapp@gmail.com",
        to: 'chandler.orn@ethereal.email',
        subject: "Verify Your Email to Start Using Timezone App",
        text: "Your verification code: " + code,
        html: htmlContentWithCode
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