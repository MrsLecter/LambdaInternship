export interface TelegramMessage {
  message_id: number;
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    username: string;
    language_code: string;
  };
  chat: {
    id: number;
    first_name: string;
    username: string;
    type: string;
  };
  date: number;
  text: string;
  entities: [{ offset: number; length: number; type: string }];
}

export interface MatchedCurrency {
  [index: number]: string | number | undefined;
  index: number;
  input: string;
  groups: undefined;
}

export interface ResponseData {
  [key: string]: string;
}

export interface CallbackMessage {
  id: string;
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    username: string;
    language_code: string;
  };
  message: {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username: string;
    };
    chat: {
      id: number;
      first_name: string;
      username: string;
      type: string;
    };
    date: number;
    text: string;
    reply_markup: { inline_keyboard: [any] };
  };
  chat_instance: string;
  data: string;
}
