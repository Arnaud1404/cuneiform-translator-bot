import 'dotenv/config';
import {InstallGlobalCommands} from './utils.js';


// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const TRANSLATE_COMMAND = {
  name: 'translate',
  description: 'Translate text to cuneiform',
  type: 1,
  options: [
    {
    "name": "text",
    "description": "Text to translate",
    "type": 3,
    "required": true,
}
  ],
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const UNTRANSLATE_COMMAND = {
  name: 'untranslate',
  description: 'Translate cuneiform to text',
  type: 1,
  options: [
    {
    "name": "cuneiform",
    "description": "Cuneiform to translate",
    "type": 3,
    "required": true,
}
  ],
  integration_types: [0, 1],
  contexts: [0, 1, 2],
}

const ALL_COMMANDS = [TEST_COMMAND, TRANSLATE_COMMAND, UNTRANSLATE_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
