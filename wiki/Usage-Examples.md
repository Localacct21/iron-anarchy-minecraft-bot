# 🎮 Bot Usage Examples

## 📝 Chat Command Examples

### Basic Movement

```
<Player> !come
<Bot> 🏃 Coming to Player

<Player> !follow Steve
<Bot> 🏃 Following Steve

<Player> !stop
<Bot> 🛑 Stopped all actions
```

### Combat Scenarios

```
<Player> !attack Griefer123
<Bot> ⚔️ Attacking Griefer123!

<Player> !guard
<Bot> 🛡️ Guard mode enabled - will attack hostile mobs nearby

<Player> !health
<Bot> ❤️ Health: 18/20 [█████████░]
<Bot> 🍖 Food: 14/20 [███████░░░]
```

### Resource Management

```
<Player> !collect cobblestone 64
<Bot> ⛏️ Collecting 32x cobblestone
<Bot> ✅ Finished collecting 32x cobblestone

<Player> !inv
<Bot> 🎒 Inventory: 32x cobblestone, 16x dirt, 8x bread, 1x iron_sword...
```

### Information Queries

```
<Player> !status
<Bot> 📊 Status: Following Player
<Bot> 📍 Position: X=123, Y=64, Z=-456
<Bot> 👥 Players online: 5

<Player> !players
<Bot> 👥 Players online: Player, Steve, Alex, Herobrine

<Player> !plugins
<Bot> 🔌 All plugins loaded and validated!
```

## 🤖 Discord Integration Examples

### Discord Status Command

```
User: !status
Bot: 🔥 Iron-Anarchy Bot Status
     Server: ironanarchy.lol
     Health: 20/20 ❤️
     Food: 18/20 🍖
     Recording: 📹 ON
     Players Online: 12
```

### Discord Chat Bridge

```
[Discord] <User> Hello from Discord!
→ Sent to Minecraft chat

[Minecraft] <Player> Hi Discord users!
→ Sent to Discord channel
```

### Discord Bot Control

```
User: !say Hello everyone!
Bot: ✅ Sent to Minecraft: "Hello everyone!"
```

## 🎯 Advanced Usage Scenarios

### Automated Base Defense

```javascript
// Enable guard mode for base protection
!guard
🛡️ Guard mode enabled - will attack hostile mobs nearby

// Bot automatically attacks:
// - Zombies, Skeletons, Creepers
// - Hostile players within range
// - Entities threatening the area
```

### Resource Gathering Session

```
<Player> !collect oak_log 20
<Bot> ⛏️ Collecting 15x oak_log
<Bot> ✅ Finished collecting 15x oak_log

<Player> !collect cobblestone 64
<Bot> ⛏️ Collecting 64x cobblestone
<Bot> ✅ Finished collecting 64x cobblestone

<Player> !inv
<Bot> 🎒 Inventory: 64x cobblestone, 15x oak_log, 12x bread...
```

### Combat Training

```
<Player> !attack TrainingDummy
<Bot> ⚔️ Attacking TrainingDummy!
[Bot automatically uses combat skills]

<Player> !health
<Bot> ❤️ Health: 16/20 [████████░░]
<Bot> 🍖 Food: 12/20 [██████░░░░]
[Bot auto-eats to restore food]

<Player> !stop
<Bot> 🛑 All actions stopped
```

## 🔄 Auto-Reconnect Examples

### Connection Lost Scenario

```
[ERROR] Bot disconnected from server
[INFO] Attempting to reconnect in 5 seconds... (1/10)
[INFO] Reconnection successful!
[SUCCESS] 🔥 Enhanced bot connected to Iron-Anarchy!
```

### Progressive Backoff

```
Attempt 1: 5 seconds delay
Attempt 2: 10 seconds delay  
Attempt 3: 20 seconds delay
Attempt 4: 40 seconds delay
Attempt 5+: 60 seconds delay (maximum)
```

## 🎮 Pathfinding Examples

### Complex Navigation

```
<Player> !come
<Bot> 🏃 Coming to Player
[Bot navigates around buildings, up stairs, through doorways]
[Pathfinding complete - Bot arrives at player location]
```

### Obstacle Avoidance

```javascript
// Bot automatically:
// - Finds optimal path around lava
// - Jumps over fences and walls
// - Digs through dirt if necessary  
// - Avoids dangerous blocks
// - Uses parkour movements when needed
```

## 📊 Monitoring Examples

### Health Monitoring

```
[INFO] Health: 20/20, Food: 20/20 - Optimal condition
[INFO] Health: 14/20, Food: 8/20 - Auto-eating activated
[SUCCESS] Health: 18/20, Food: 16/20 - Recovery complete
```

### Combat Logging

```
[PVP] Attacking hostile mob: zombie
[PVP] Bot took damage! Health: 16/20
[PVP] Combat complete - Enemy defeated
[SUCCESS] Auto-eat activated - Food restored
```

### Performance Metrics

```
[INFO] Players online: 12
[INFO] Position: X=245, Y=64, Z=-156
[INFO] Following: PlayerName
[INFO] Guard mode: ACTIVE
[INFO] Recording: ENABLED (247 events)
```

## 🎯 Error Handling Examples

### Plugin Issues

```
❌ Failed to load mineflayer-pvp: Plugin error
✅ Attempting plugin reload...
✅ Successfully loaded: mineflayer-pvp
🎉 All plugins loaded successfully!
```

### Command Errors

```
<Player> !attack
<Bot> ⚔️ Usage: !attack <player>

<Player> !collect
<Bot> ⛏️ Usage: !collect <block_name> [amount]

<Player> !invalidcommand
<Bot> ❌ Unknown command: invalidcommand. Use !help for commands.
```

### Network Issues

```
[ERROR] Connection timeout
[INFO] Attempting to reconnect in 10 seconds... (2/10)
[ERROR] Connection failed - retrying
[INFO] Attempting to reconnect in 20 seconds... (3/10)
[SUCCESS] Reconnection successful!
```

## 🔧 Configuration Examples

### Auto-Eat Settings

```javascript
// Conservative eating (eat early)
bot.autoEat.options = {
  priority: 'foodPoints',
  startAt: 16,  // Eat at 16/20 food
  bannedFood: ['rotten_flesh']
}

// Aggressive eating (eat late)  
bot.autoEat.options = {
  priority: 'saturation',
  startAt: 10,  // Eat at 10/20 food
  bannedFood: []
}
```

### Combat Configuration

```javascript
// Defensive combat
bot.pvp.followRange = 4     // Keep distance
bot.pvp.meleeAttackRate = 0.5  // Slower attacks

// Aggressive combat
bot.pvp.followRange = 1     // Stay close
bot.pvp.meleeAttackRate = 1.0  // Fast attacks
```

## 📱 Mobile-Friendly Commands

### Quick Status Check

```
!status
📊 Status: Idle | 📍 X=123,Y=64,Z=-456 | 👥 Players: 5
```

### Emergency Commands

```
!stop     # Emergency stop
!health   # Quick health check  
!come     # Emergency recall
!help     # Quick command list
```

This comprehensive usage guide should help users understand exactly how to interact with the bot and what to expect from each command!

---

[🏠 Back to Home](Home.md)
