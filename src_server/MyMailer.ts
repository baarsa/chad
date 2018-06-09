import * as nodemailer from 'nodemailer'

export default class MyMailer {
	private transporter: nodemailer.Transporter;

	public constructor() {
		this.createTransporter();
	}

	public send(mail: MailDetails) {
		let mailOptions = {
			from: "Chad",
			to: mail.address,
			subject: mail.subject,
			text: mail.body
		};

		this.transporter.sendMail(mailOptions, (err: Error, info: any) => {
			if (err) {
				console.log(err);
			} else {
				console.log("email sent: " + info.response);
			}
		});
	}

	private createTransporter() {
		this.transporter = nodemailer.createTransport({
		    host: 'smtp.ethereal.email',
		    port: 587,
		    auth: {
		        user: 'fl3whjrvaicjzewd@ethereal.email',
		        pass: 'SRT11RqWTypZaeANFF'
		    }
		});
	}
}

export interface MailDetails {
	address: string,
	subject: string,
	body: string
}
