const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  puppeteer: {
    executablePath: '/usr/bin/brave-browser-stable',
  },
  authStrategy: new LocalAuth({
    clientId: "client-one"
  }),
  puppeteer: {
    headless: false,
  },
});

client.on('authenticated', () => {
  // client.getChats().then(res=>setTimeout(()=>console.log(res),3000))
});

client.on('qr', (qr) => {
  qrcode.generate(qr, {small: true});
  console.log('QR RECEIVED', qr);
});

client.on('ready',async() => {
  const contacts = await client.getContacts();
  const chats = await client.getChats();
  const mehdi = contacts.find(contact => contact.number==="989378047897");
  const chat = chats.find(c => c.id.user===mehdi.number);
  // [...Array(100)].forEach(() => chat.sendMessage("سلام من رباتم اومدم بخورمت"));  
});

client.on('message', async message => {
  if(message.body === 'سلام') {
  [...Array(100)].forEach(() => message.reply("سلام من رباتم اومدم بخورمت"));  
	}
});

client.initialize();


