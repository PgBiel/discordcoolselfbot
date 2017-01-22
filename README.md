# discordcoolselfbot
Some cool selfbot made for reasons yet unknown by humanity.

##Installation

(Make sure you have at least Node 7 installed.)

1. Open Terminal or, in Windows, CMD.
2. Run `npm install PgBiel/discordcoolselfbot`.
3. After done, go to your user folder, open the folder named `node_modules`, and copy the folder named `discordcoolselfbot` to anywhere you like.
4. Go inside that folder and open the file named `selfiebot.js`.
5. Once opened, look for this line:

![Line 141](http://i.imgur.com/At366sL.png)

Replace `"insert/dir/here.js"` with the directory to the bot file. Example: `"/Users/GuyCool/Documents/discordcoolselfbot/selfiebot.js"`.

Next, scroll down to the very bottom of the file.

![Bottom (last) line](http://i.imgur.com/YOB5zKb.png)

Replace `"insert token"` with your token, example: `"MHsodfsjofdsf.sdfosdfjos.fGODfogsfOGfg"`. To grab your token, first go in the Discord App (or the web version, but make sure youe in chrome) and press:
* Ctrl + Shift + I in case you are in Windows, or
* If Mac, press Command + Option + I.

This will open developer tools.
Now do the following:

![Applications tab then Local Storage](http://i.imgur.com/v6axzdA.png)

(If you do not see the Applications tab, click the two arrows on the top right (They look like this: `»`) and select Applications.)

Now copy your token (the bunch of random letters next to the token field) and paste them in the spot said.
Assuming the token is `a.b.c.d.e.f`, the line would look like this:
```js
me.login("a.b.c.d.e.f");
```

Done! Now to start your bot, write this in Terminal/CMD:
```
node --harmony
```
**then, Drag and Drop the `selfiebot.js` file into your Terminal/CMD window.** <- Important Step

Doing that step will add the bot file's path to your terminal. Assuming the file path is `/Users/GuyCool/Documents/discordcoolselfbot/selfiebot.js`, it would then look like this:
```
node --harmony /Users/GuyCool/Documents/discordcoolselfbot/selfiebot.js 
```

Done! Your selfbot has started on your account, if all steps have been followed correctly. ;)
