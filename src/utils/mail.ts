import nodemailer, {
    SendMailOptions,
    Transport,
    TransportOptions,
} from 'nodemailer';

export const sendEmail = async (mailOptions: SendMailOptions) => {
    try {
        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        } as TransportOptions | Transport<unknown>);
        const info = await transport.sendMail(mailOptions);
        return info;
    } catch (error) {
        const err = error as Error;
        throw new Error(err.message);
    }
};
