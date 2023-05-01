export interface MailerMessage {
  to: string | string[];
  subject: string;
  htmlBody: string;
}
