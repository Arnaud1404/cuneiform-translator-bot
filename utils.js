import 'dotenv/config';

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

// Simple method that returns a random emoji from list
export function getRandomEmoji() {
  const emojiList = ['😭','😄','😌','🤓','😎','😤','🤖','😶‍🌫️','🌏','📸','💿','👋','🌊','✨'];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// const cuneiformMap = {
//   'a': '𒋻', 'b': '𒁀', 'c': '𐏓', 'd': '𒁓', 'e': '𒀼', 'f': '𐎣', 'g': '𒋝', 'h': '𒀂', 'i': '𒐕',
//   'j': '𒑟', 'k': '𒐞', 'l': '𒁇', 'm': '𐎠', 'n': ' 𒐖', 'o': '𒆸', 'p': '𒇬', 'q': '𒌒', 'r': ' 𒇲',
//   's': '𒔼', 't': '𒈦', 'u': '𒑚', 'v': '𐎏', 'w': '𒉼', 'x': '𒉽', 'y': '𒌨', 'z': '𒑣'
// };
export function translate(str) {
  const cuneiformMap = {
    'a': '𒋻', 'b': '𒁀', 'c': '𐏓', 'd': '𒁓', 'e': '𒀼', 'f': '𐎣', 'g': '𒋝', 'h': '𒀂', 'i': '𒋙',
    'j': '𒑟', 'k': '𒐞', 'l': '𒁇', 'm': '𐎠', 'n': '𒀀', 'o': '𒆸', 'p': '𒇬', 'q': '𒌒', 'r': '𒇲',
    's': '𒉡', 't': '𒈦', 'u': '𒑚', 'v': '𐎏', 'w': '𒉼', 'x': '𒉽', 'y': '𒌨', 'z': '𒑣',
    // Numbers
    '1': '𒐕', '2': '𒐖', '3': '𒐗', '4': '𒐘', '5': '𒐙', '6': '𒐚', '7': '𒐛', '8': '𒐜', '9': '𒐝', '0': '𒐀',
    // Punctuation
    '.': '𒀸', ',': '𒀺'
  };
  
  const removeAccents = str =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  const normalizedStr = removeAccents(str.toLowerCase());
  let translatedStr = '';
  
  for (const char of normalizedStr) {
    translatedStr += cuneiformMap[char] || char;
  }
  
  return translatedStr;
}

export function untranslate(cuneiformStr) {
  const cuneiformMap = {
    '𒋻': 'a', '𒁀': 'b', '𐏓': 'c', '𒁓': 'd', '𒀼': 'e', '𐎣': 'f', '𒋝': 'g', '𒀂': 'h', '𒋙': 'i',
    '𒑟': 'j', '𒐞': 'k', '𒁇': 'l', '𐎠': 'm', '𒀀': 'n', '𒆸': 'o', '𒇬': 'p', '𒌒': 'q', '𒇲': 'r',
    '𒉡': 's', '𒈦': 't', '𒑚': 'u', '𐎏': 'v', '𒉼': 'w', '𒉽': 'x', '𒌨': 'y', '𒑣': 'z',
    // Numbers
    '𒐕': '1', '𒐖': '2', '𒐗': '3', '𒐘': '4', '𒐙': '5', '𒐚': '6', '𒐛': '7', '𒐜': '8', '𒐝': '9', '𒐀': '0',
    // Punctuation
    '𒀸': '.', '𒀺': ','
  };

  let untranslateStr = '';
  let capitalizeNext = true;

  for (const char of cuneiformStr) {
    if (char === '𒀸') {
      capitalizeNext = true;
    }
    const translatedChar = cuneiformMap[char] || char;
    if (capitalizeNext && /[a-zA-Z]/.test(translatedChar)) {
      untranslateStr += translatedChar.toUpperCase();
      capitalizeNext = false;
    } else {
      untranslateStr += translatedChar;
    }
  }

  untranslateStr = untranslateStr.replace(/\bi\b/g, 'I');
  return untranslateStr;
}

