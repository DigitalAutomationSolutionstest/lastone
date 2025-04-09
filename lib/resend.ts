import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY!
const teamEmail = process.env.TEAM_EMAIL!

export const resend = new Resend(resendApiKey)
export const teamEmailAddress = teamEmail 