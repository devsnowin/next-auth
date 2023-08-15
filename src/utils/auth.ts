import bcrypt from 'bcryptjs';
import { SendMailOptions } from 'nodemailer';
import { sendEmail } from './mail';
import User from '@/models/user';

export const sendVerifyEmail = async (
    userId: string,
    email: string,
    emailType: 'VERIFY_EMAIL' | 'RESET_PASSWORD',
) => {
    const token = await bcrypt.hash(userId, 10);
    if (emailType === 'VERIFY_EMAIL') {
        await User.findByIdAndUpdate(userId, {
            verifyToken: token,
            verifyTokenExpiry: Date.now() + 3600000,
        });
    } else {
        await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: Date.now() + 3600000,
        });
    }

    const verificationURL = `${process.env.NEXT_URL}/verifyemail?token=${token}`;
    const resetURL = `${process.env.NEXT_URL}/resetpassword?token=${token}`;

    const mailOptions: SendMailOptions = {
        from: 'next-auth <snowintj123@gmail.com>',
        to: email,
        subject:
            emailType === 'VERIFY_EMAIL'
                ? 'Verify your account'
                : 'Reset your password',
        html: `<p>Click the <a href=${
            emailType === 'VERIFY_EMAIL' ? verificationURL : resetURL
        }>here</a> to ${
            emailType === 'VERIFY_EMAIL'
                ? 'verify your account'
                : 'reset your password'
        } or copy and paste the link in your browser. <br> ${
            emailType === 'VERIFY_EMAIL' ? verificationURL : resetURL
        } </p>`,
    };

    return await sendEmail(mailOptions);
};
