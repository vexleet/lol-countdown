# lol-countdown
LoL Countdown is an Electron App where the user can easily follow the enemy summoner spells while in game.

## Dev notes
At first I wanted to use Electron as I saw it can be always on top as a desktop app but after creating the logic for opening the electron app when a game of 
League of Legends launches and to close when it ends, I found out that it can't stay over games. Apparently games make it so they take all priority of the window and you can't really
draw over them so after a research I found out that I have to use [Overwolf](https://www.overwolf.com/creators/build-an-app/) in order to complete my idea. I have pushed my Electron logic
as a future referance and just to stay in the commit history.
Checked that the window doesn't disappear whem the game is borderless so I will stick with Electron

## Designs
The design is simple... Its just the enemy summoner icons with their spells under them. The **logic** is when the user presses on a summoner icon it will start the countdown for this summoner spell
, if the user presses the icon again it will remove the countdown because there is a chance the user missclicks the needed summoner spell.
- [Design link](https://xd.adobe.com/view/18099850-eb32-4a4f-9582-20cc500cf34e-4d5a/?hints=off)
