export class Email {

  mail_id?: any;
  subject?: any
  message?: any;
  priority?: any;
  sended_at?: any;
  mail:
    {
      "reciever": string[],
      "sender": string
    };
  folder?: any;
  deleted_at: any;


  constructor(mail_id: any, subject: any, message: any, priority: any, sended_at: any, mail: any, folder: any, deleted_at: any) {
    this.mail_id = mail_id
    this.subject = subject
    this.message = message
    this.priority = priority
    this.sended_at = sended_at
    this.mail = mail
    this.folder = folder
    this.deleted_at = deleted_at
  }


  // from?: any;
  // to?: any;
  // date?: any;
  // id?: an
  // constructor(from: string, name: string, to: string, date: string, message: string, id: number, pri: number, m_id: any, subject: any) {
  //     this.mail_id = m_id;
  //     this.subject = subject;
  //     this.from = from;
  //
  //     this.to = to;
  //     this.date = date;
  //     this.message = message;
  //     this.id = id;
  //     this.priority = pri;
  // }

}
