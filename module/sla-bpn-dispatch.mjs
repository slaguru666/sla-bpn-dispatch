const MODULE_ID = "sla-bpn-dispatch";
const DRAFT_KEY = "bpnDraft";
const ACTOR_FOLDER_NAME = "SLA BPN Dispatch NPCs";
let TABLES = null;

const SCENARIO_FRAMES = {
  blue: [
    {
      id: "blue-pump-clearance",
      shortTitle: "Pump Ghosts",
      missionFocus: "Eliminate a threat before it reaches public view.",
      colourMissionIdea: "Clear Carrien from a sewer pumping station before repair crews go live on-site.",
      location: "Sewer network and maintenance tunnels beneath a low-SCL tenement arc.",
      atmosphere: "Oppressive rain above ground, ankle-deep runoff below, and every tunnel echoing with machine throb.",
      opposition: "Carrien packs and one nest-alpha using the flooded access galleries.",
      oppositionAttitude: "Are starving, territorial, and driven to charge anything making light or noise.",
      civilianFaction: "Maintenance workers trying to keep the block from flooding into the hab levels.",
      extraObjective: "Recover one intact sample of the contamination feeding the nest.",
      escalationEvent: "If the pumps stay offline too long, the whole block begins to flood and civilians panic upward.",
      complication: "The maintenance foreman has been selling access schematics to scavengers and will try to hide it.",
      localTwist: "The contamination is not accidental; someone seeded the tunnels to force a redevelopment contract.",
      issuingDepartment: "Mort Department / Ops Control",
      contactRole: "Shift Maintenance Controller",
      contactArchetype: "controller",
      contactLocation: "A barricaded relay room overlooking the lower pump shafts.",
      threatArchetype: "carrien",
      threatRole: "Nest Alpha",
      threatCountLabel: "One alpha and a fast-moving pack."
    },
    {
      id: "blue-eviction-cleanout",
      shortTitle: "Residue Notice",
      missionFocus: "Clean up an old SLA operational mess.",
      colourMissionIdea: "Evict squatters and secure a condemned recycler before demolition crews arrive.",
      location: "A half-powered recycling depot in a condemned housing strip.",
      atmosphere: "Chemical fog hangs low and the whole block stinks of hot metal, wet plaster, and old blood.",
      opposition: "A desperate street gang holding the depot plus a few terrified scavenger families inside the same shell.",
      oppositionAttitude: "Talk hard, posture for cameras, but are ready to fold if offered one way out.",
      civilianFaction: "Neighbourhood residents who want the gang gone but do not trust SLA to distinguish them from the problem.",
      extraObjective: "Keep the recycler’s core machinery functional for sponsor inspection.",
      escalationEvent: "A scavenger fire starts in the upper catwalks, pushing everyone toward the same exit lanes.",
      complication: "The depot contains evidence from an earlier SLA kill-team visit that nobody filed correctly.",
      localTwist: "The original paperwork deliberately misclassified the site so a corporate shell company could seize it cheaply.",
      issuingDepartment: "Department-M / Internal Containment",
      contactRole: "Department-M Disposal Clerk",
      contactArchetype: "analyst",
      contactLocation: "A mobile command kiosk parked behind a portable blast shield.",
      threatArchetype: "ganger",
      threatRole: "Depot Gang Boss",
      threatCountLabel: "One loud boss and half a dozen badly coordinated shooters."
    }
  ],
  yellow: [
    {
      id: "yellow-prototype-recovery",
      shortTitle: "Cold Return",
      missionFocus: "Retrieve an item or specimen intact.",
      colourMissionIdea: "Recover a stolen prototype before it disappears into the black-market chain.",
      location: "A transit interchange feeding into a hidden market spine.",
      atmosphere: "Packed concourses, vendor noise, flashing route boards, and too many bodies to easily track the courier.",
      opposition: "A retrieval crew working for organised crime with local route control and fast bikes on standby.",
      oppositionAttitude: "Would rather run than fight, but will kill witnesses if boxed in.",
      civilianFaction: "Black-market traders who know the unofficial routes and sell them to whoever pays first.",
      extraObjective: "Bring back the data case unopened and verifiably untampered.",
      escalationEvent: "The courier network triggers a station lockdown and reroutes all civilian flow through the kill zone.",
      complication: "The package is still broadcasting, making every interested party converge on the same target.",
      localTwist: "The prototype is bait; Head Office actually wants the retrieval crew followed back to a higher-value buyer.",
      issuingDepartment: "Cloak Tactical Oversight",
      contactRole: "Independent Financier",
      contactArchetype: "fixer",
      contactLocation: "A quiet cafe mezzanine overlooking the station’s arrivals board.",
      threatArchetype: "retrieval-crew",
      threatRole: "Courier Handler",
      threatCountLabel: "One handler, two bike-runners, and a sniper looking after the exchange."
    }
  ],
  green: [
    {
      id: "green-cannibal-perimeter",
      shortTitle: "Wall Bite",
      missionFocus: "Eliminate a threat before it reaches public view.",
      colourMissionIdea: "Hit a breach team before it can break through the Cannibal Sector perimeter and trigger a broadcast panic.",
      location: "The Cannibal Sector perimeter wall and the service roads wrapped around it.",
      atmosphere: "Sirens, floodlights, wet concrete, and the constant thump of distant impact on the wall plating.",
      opposition: "Cannibal raiders with improvised breaching charges and a local guide inside the city side.",
      oppositionAttitude: "Are committed, feral, and keen to take someone back with them if the breach fails.",
      civilianFaction: "A transient cluster of freight workers trapped near the service roads during lockdown.",
      extraObjective: "Capture one living raider who can identify the city-side collaborator.",
      escalationEvent: "A secondary breach warning forces Shiver units to peel away, leaving the squad exposed.",
      complication: "The internal guide is wearing a legitimate contractor pass and can blend into evac traffic.",
      localTwist: "The breach is a distraction for an unrelated extraction happening two gates away.",
      issuingDepartment: "Shiver Command Liaison Desk",
      contactRole: "Perimeter Shiver Sergeant",
      contactArchetype: "shiver",
      contactLocation: "An armoured checkpoint container bolted to the inner wall road.",
      threatArchetype: "raider",
      threatRole: "Breacher Chief",
      threatCountLabel: "A brutal lead breacher with a fast assault cell behind him."
    },
    {
      id: "green-kill-order",
      shortTitle: "Dead Feed",
      missionFocus: "Hunt a named hostile and confirm status.",
      colourMissionIdea: "Stop a contract killer before the second murder finishes the media pattern.",
      location: "A rain-soaked rooftop district threaded with service bridges and maintenance lifts.",
      atmosphere: "Visibility is broken by rain, neon reflections, and intermittent drone spotlights.",
      opposition: "A professional killer with a two-person support team and pre-positioned escape routes.",
      oppositionAttitude: "Remain cool, efficient, and willing to trade casualties for a clean getaway window.",
      civilianFaction: "A cluster of thrill-streamers trying to capture the chase from nearby rooftops.",
      extraObjective: "Recover the killer’s weapon package and comms slate intact.",
      escalationEvent: "The support team remotely kills the lights and forces the pursuit onto unsecured skybridges.",
      complication: "The target has a face the public already knows, making collateral narrative control much harder.",
      localTwist: "The supposed contract is only the visible layer; the true target is hidden among the responding authorities.",
      issuingDepartment: "Mort Department / Ops Control",
      contactRole: "Veteran Desk Op",
      contactArchetype: "detective",
      contactLocation: "A temporary command room in a shuttered rooftop transit office.",
      threatArchetype: "killer",
      threatRole: "Named Contract Killer",
      threatCountLabel: "One surgical hitter backed by two disciplined support shooters."
    }
  ],
  white: [
    {
      id: "white-serial-pattern",
      shortTitle: "Witness Static",
      missionFocus: "Investigate a crime scene with political fallout.",
      colourMissionIdea: "Link a string of identical killings before the murderer reaches a protected witness.",
      location: "A residential block, its adjoining monorail stop, and the forensic seal around the newest murder scene.",
      atmosphere: "The block is unnaturally quiet, everyone is watching from behind cheap screens, and Shivers are over-managing the cordon.",
      opposition: "A serial killer cell staging scenes to manipulate a bigger investigation.",
      oppositionAttitude: "Enjoy the attention, leave deliberate clues, and want the squad to see the pattern too late.",
      civilianFaction: "Residents terrified of speaking after seeing just enough to know SLA is already late.",
      extraObjective: "Secure the witness and move them somewhere the killer cannot predict.",
      escalationEvent: "An old evidence trail suddenly points at a different scene and splits available manpower.",
      complication: "The witness’s own statement is incomplete because they are protecting someone inside the block.",
      localTwist: "The killer is recreating an older SLA-blacklisted case and expects the same official cover-up.",
      issuingDepartment: "Mort Department / Ops Control",
      contactRole: "Case Liaison Detective",
      contactArchetype: "detective",
      contactLocation: "A sealed witness room improvised from a laundrette office.",
      threatArchetype: "killer",
      threatRole: "Pattern Cell Leader",
      threatCountLabel: "A lead killer with one cleanup partner and one obsessed documentarian."
    },
    {
      id: "white-ammo-sabotage",
      shortTitle: "Spent Truth",
      missionFocus: "Retrieve data or recordings without contamination.",
      colourMissionIdea: "Trace sabotaged SLA ammunition back through the supply chain before anyone realises how deep it goes.",
      location: "A corporate ammo depot, a Shiver evidence locker, and a low-grade loading district in between.",
      atmosphere: "Power flickers every few minutes, loading servitors keep stuttering mid-task, and everybody is too tense to blink.",
      opposition: "Corporate security and one inside accountant trying to erase the trail before it reaches Head Office.",
      oppositionAttitude: "Prefer intimidation and paperwork pressure, but will switch to lethal containment if exposed.",
      civilianFaction: "Dock loaders who know the movement pattern of every crate but do not trust official investigators.",
      extraObjective: "Recover one clean crate and one tampered crate for comparison testing.",
      escalationEvent: "Depot lockdown procedures seal the archive level and begin deleting local logs.",
      complication: "The inside accountant is cooperating because their family is already off the board if they stop.",
      localTwist: "The sabotage was designed to make a specific squad fail publicly rather than to broadly poison supply.",
      issuingDepartment: "Department-M / Internal Containment",
      contactRole: "Corporate Asset Auditor",
      contactArchetype: "analyst",
      contactLocation: "A dark logistics office above the depot loading floor.",
      threatArchetype: "corpsec",
      threatRole: "Security Overseer",
      threatCountLabel: "One hard-edged overseer and a disciplined internal security team."
    }
  ],
  grey: [
    {
      id: "grey-audit-escort",
      shortTitle: "Quiet Ledger",
      missionFocus: "Protect or escort a cargo asset.",
      colourMissionIdea: "Keep an audit convoy moving while everyone who profited from the missing cargo tries to erase the proof.",
      location: "An industrial spine road running between bonded warehouses and a secure internal archive.",
      atmosphere: "The sector is all sodium light, surveillance masts, and thin excuses from everyone in a suit.",
      opposition: "Departmentally protected smugglers, hired heavies, and one executive aide running the cover story.",
      oppositionAttitude: "Would rather pressure, delay, and redirect than openly trade fire in company view.",
      civilianFaction: "Warehouse staff who know something is wrong but fear losing the only stable work they have.",
      extraObjective: "Keep the audit chain unbroken from seizure to final archive.",
      escalationEvent: "A sponsor legal team arrives and tries to freeze the whole operation with paperwork.",
      complication: "The archive itself contains evidence implicating the issuing department.",
      localTwist: "The convoy is only half the story; the real theft walked out days ago wearing a department badge.",
      issuingDepartment: "Department-M / Internal Containment",
      contactRole: "Departmental Enforcement Liaison",
      contactArchetype: "corporate",
      contactLocation: "An armoured office container chained to the convoy lead truck.",
      threatArchetype: "corpsec",
      threatRole: "Internal Security Chief",
      threatCountLabel: "One security chief and a quiet detail of professional enforcers."
    }
  ],
  silver: [
    {
      id: "silver-live-escort",
      shortTitle: "Smile Cut",
      missionFocus: "Protect or escort a person through a hostile district.",
      colourMissionIdea: "Keep a sponsor-backed public figure alive without letting the cameras see how close the job gets.",
      location: "A ribbon of sponsor venues, red-carpet choke points, and one ugly service corridor nobody told the cameras about.",
      atmosphere: "Flash lamps, branded drones, crowd heat, and just enough panic underneath the applause to be dangerous.",
      opposition: "A stalker cell, freelance agitators, and one rival sponsor fixer hoping to turn the event into a scandal.",
      oppositionAttitude: "Would prefer embarrassment over blood but are ready to escalate if the window closes.",
      civilianFaction: "Fans and paid attendees packed too tightly to separate cleanly from the real threat.",
      extraObjective: "Protect the sponsor narrative as much as the body being moved.",
      escalationEvent: "A live-feed malfunction dumps backstage footage into the public stream and sends the route sideways.",
      complication: "The VIP is hiding a personal agenda and keeps deviating from the protected path.",
      localTwist: "The entire appearance is bait designed to expose who inside the sponsor chain is leaking movement plans.",
      issuingDepartment: "Media Relations / Sponsor Operations",
      contactRole: "Media Fixer",
      contactArchetype: "media",
      contactLocation: "A mobile control booth hidden behind the main broadcast gantry.",
      threatArchetype: "security",
      threatRole: "Hostile Fixer",
      threatCountLabel: "One well-dressed operator with hired hands embedded in the crowd."
    }
  ],
  jade: [
    {
      id: "jade-containment",
      shortTitle: "Wet Bloom",
      missionFocus: "Contain or quarantine an outbreak or Ebb event.",
      colourMissionIdea: "Lock down a contaminated block before the spill crosses into the transit grid.",
      location: "A mixed-use block connected to drainage canals and a damaged med-lab service annex.",
      atmosphere: "Filtered alarms, chemical stink, and a wet sheen on every surface that might be alive.",
      opposition: "Mutated survivors, a failed lab asset, and one containment officer already planning to burn the evidence.",
      oppositionAttitude: "Act unpredictably and spike between blind panic and sudden aggression.",
      civilianFaction: "A street clinic trying to keep the least infected residents alive long enough to evacuate.",
      extraObjective: "Secure one uncontaminated sample for Karma analysis.",
      escalationEvent: "Containment seals begin dropping floor by floor, isolating parts of the squad from one another.",
      complication: "The official quarantine map is wrong and funnels civilians toward the hottest zone.",
      localTwist: "The contamination profile matches a programme nobody admits still exists.",
      issuingDepartment: "Karma Hazard Response",
      contactRole: "Field Scientist",
      contactArchetype: "scientist",
      contactLocation: "A decontamination vestibule made from two bolted ambulance trailers.",
      threatArchetype: "stormer",
      threatRole: "Mutated Lab Asset",
      threatCountLabel: "One unstable asset and several contaminated survivors acting around it."
    }
  ],
  red: [
    {
      id: "red-monorail-hostage",
      shortTitle: "Dead Platform",
      missionFocus: "Protect or escort a person through a hostile district.",
      colourMissionIdea: "Board a hijacked monorail, cut the threat out, and stop a public disaster before it multiplies.",
      location: "A moving monorail line, two sealed stations, and the service deck beneath the track.",
      atmosphere: "Screaming brakes, emergency klaxons, static over public address, and media drones already racing the train.",
      opposition: "A terror cell with improvised explosives and a hardline trigger operator.",
      oppositionAttitude: "Need the spectacle as much as the tactical win and will kill quickly if denied it.",
      civilianFaction: "Hostages trapped inside the train with just enough courage to help if guided correctly.",
      extraObjective: "Keep the train itself intact enough for a survivor extraction.",
      escalationEvent: "A secondary device threatens the inbound station and splits command priorities.",
      complication: "One hostage is secretly tied to the cell and is feeding them squad movement.",
      localTwist: "The train was chosen because someone important is riding under a false manifest.",
      issuingDepartment: "Shiver Command Liaison Desk",
      contactRole: "Transit Crisis Controller",
      contactArchetype: "controller",
      contactLocation: "A sealed signal room with live route telemetry and too many shouting department heads.",
      threatArchetype: "riot",
      threatRole: "Cell Trigger Man",
      threatCountLabel: "One detonation lead, two shooters, and a train full of leverage."
    },
    {
      id: "red-broadcast-retake",
      shortTitle: "Signal Mercy",
      missionFocus: "Eliminate a threat before it reaches public view.",
      colourMissionIdea: "Retake a broadcast tower before the final message turns a bad district into a citywide panic.",
      location: "A media tower, its control floors, and the access streets packed with fleeing civilians.",
      atmosphere: "Emergency beacons, dropped live feeds, smoke in the ventilation stacks, and every screen in Mort pointing at the same problem.",
      opposition: "An extremist crew with tower access and stolen media credentials.",
      oppositionAttitude: "Expect to die but want the audience to watch it happen in the right order.",
      civilianFaction: "Panicking evacuees clogging the lower service roads and making every clean shot harder.",
      extraObjective: "Recover the message core and identify who green-lit tower access.",
      escalationEvent: "Backup transmitters spin up on a timer and broaden the threat window.",
      complication: "The tower engineer who can shut the system down has been wounded and hidden by the crowd.",
      localTwist: "The message is less propaganda than data dump, and one department in SLA wants it to air.",
      issuingDepartment: "Media Relations / Sponsor Operations",
      contactRole: "Broadcast Security Captain",
      contactArchetype: "shiver",
      contactLocation: "A lower-floor security post running on emergency battery.",
      threatArchetype: "security",
      threatRole: "Tower Seizure Lead",
      threatCountLabel: "One charismatic lead and a handful of committed technical shooters."
    }
  ],
  black: [
    {
      id: "black-silent-vault",
      shortTitle: "Mute Entry",
      missionFocus: "Retrieve data or recordings without contamination.",
      colourMissionIdea: "Slip into a sealed vault, lift one file set, and leave the archive looking untouched.",
      location: "A corporate research vault buried under a routine logistics floor.",
      atmosphere: "Cold air, sound-dampened corridors, biometric locks, and too much silence to trust.",
      opposition: "Internal black security and one compartmentalised watcher who does not know the whole job.",
      oppositionAttitude: "Stay disciplined, silent, and willing to erase the evidence of their own failure.",
      civilianFaction: "Night-shift technicians who do not understand the stakes but know every route in the building.",
      extraObjective: "Remove a second innocuous-looking archive block that actually matters more than the main objective.",
      escalationEvent: "A silent alarm brings in an internal response team with orders to close the floor permanently.",
      complication: "The file set is mirrored to a live observer station and cannot simply be taken.",
      localTwist: "The client is not paying for the theft; they are paying to confirm what Head Office already suspects.",
      issuingDepartment: "Head Office Special Assignments",
      contactRole: "Darkfinder Case Officer",
      contactArchetype: "corporate",
      contactLocation: "A blackout-safe service apartment three blocks from the target tower.",
      threatArchetype: "blackops",
      threatRole: "Vault Warden",
      threatCountLabel: "One silent warden and a two-person ghost response team."
    },
    {
      id: "black-disavowed-burn",
      shortTitle: "Ash Ledger",
      missionFocus: "Sabotage or destroy a target off the books.",
      colourMissionIdea: "Burn a deniable site and seed the right false evidence before anyone asks why it existed.",
      location: "A shell company warehouse wrapped around an unlisted lab basement.",
      atmosphere: "Generator hum, shuttered loading bays, and an air that already feels abandoned on purpose.",
      opposition: "Contract cleaners and one site supervisor prepared for a final-burn contingency.",
      oppositionAttitude: "Know the site is disposable and only care about buying enough time to erase the real trail.",
      civilianFaction: "Nearby dock crews who heard there was money in tonight’s unusual overtime orders.",
      extraObjective: "Leave one trail leading toward a rival corporate culprit.",
      escalationEvent: "A chemical fire spreads faster than expected and starts opening parts of the hidden basement.",
      complication: "One asset inside the site is still alive and worth far more than the building.",
      localTwist: "The false evidence you were told to plant matches a previous cover story almost word for word.",
      issuingDepartment: "Head Office Special Assignments",
      contactRole: "Freelance Financier",
      contactArchetype: "fixer",
      contactLocation: "A remote comms booth patched through a dead sponsor office.",
      threatArchetype: "blackops",
      threatRole: "Cleanup Supervisor",
      threatCountLabel: "One hard cleanup lead, one torch specialist, and a final-burn team."
    }
  ],
  platinum: [
    {
      id: "platinum-head-office",
      shortTitle: "Quiet Crown",
      missionFocus: "Protect or escort a person through a hostile district.",
      colourMissionIdea: "Extract a Head Office asset who knows too much without revealing the extraction is even happening.",
      location: "A sealed executive sector stitched into an older transit artery beneath it.",
      atmosphere: "Too clean above, too secret below, and everyone on-site acting as if the wrong word could kill them.",
      opposition: "A compartmentalised internal response team and one asset handler trying to rewrite the operation in real time.",
      oppositionAttitude: "Never shout, rarely miss, and assume everyone around them is expendable.",
      civilianFaction: "None officially, though a handful of overlooked service workers are trapped inside the machinery.",
      extraObjective: "Return every mission record to Head Office only.",
      escalationEvent: "Command changes the extraction route mid-run, implying compromise at the original pickup.",
      complication: "The protected asset is deciding whether the squad is the rescue team or the last cleanup team they will ever see.",
      localTwist: "The extraction itself is cover for a private conversation one Head Office director wants another never to hear.",
      issuingDepartment: "Head Office Special Assignments",
      contactRole: "Head Office Courier",
      contactArchetype: "corporate",
      contactLocation: "A private transit berth accessible only by dead-route credentials.",
      threatArchetype: "blackops",
      threatRole: "Executive Recovery Lead",
      threatCountLabel: "One elite retrieval leader and a pair of immaculate shadow operators."
    }
  ]
};

const CONTACT_ARCHETYPES = {
  detective: { combat: 42, instinct: 55, speed: 38, loyalty: 46, armor: 1, dr: 0, health: 11, hits: 2, weapon: "heavy-pistol", image: "icons/svg/mystery-man.svg" },
  analyst: { combat: 28, instinct: 52, speed: 31, loyalty: 44, armor: 0, dr: 0, health: 9, hits: 2, weapon: "holdout", image: "icons/svg/mystery-man.svg" },
  scientist: { combat: 24, instinct: 47, speed: 28, loyalty: 38, armor: 0, dr: 0, health: 9, hits: 2, weapon: "none", image: "icons/svg/lab.svg" },
  fixer: { combat: 36, instinct: 49, speed: 44, loyalty: 32, armor: 1, dr: 0, health: 10, hits: 2, weapon: "machine-pistol", image: "icons/svg/mystery-man.svg" },
  controller: { combat: 30, instinct: 50, speed: 34, loyalty: 48, armor: 1, dr: 0, health: 10, hits: 2, weapon: "holdout", image: "icons/svg/target.svg" },
  shiver: { combat: 48, instinct: 44, speed: 38, loyalty: 53, armor: 3, dr: 1, health: 12, hits: 2, weapon: "service-carbine", image: "icons/svg/shield.svg" },
  media: { combat: 20, instinct: 41, speed: 35, loyalty: 30, armor: 0, dr: 0, health: 8, hits: 2, weapon: "none", image: "icons/svg/book.svg" },
  corporate: { combat: 34, instinct: 46, speed: 32, loyalty: 42, armor: 1, dr: 0, health: 10, hits: 2, weapon: "holdout", image: "icons/svg/mystery-man.svg" }
};

const THREAT_ARCHETYPES = {
  ganger: { combat: 46, instinct: 32, speed: 39, armor: 1, dr: 0, health: 11, hits: 2, weapon: "smg", image: "icons/svg/skull.svg" },
  raider: { combat: 49, instinct: 36, speed: 42, armor: 1, dr: 0, health: 12, hits: 2, weapon: "shotgun", image: "icons/svg/skull.svg" },
  killer: { combat: 58, instinct: 45, speed: 51, armor: 2, dr: 1, health: 12, hits: 2, weapon: "machine-pistol", image: "icons/svg/cowled.svg" },
  corpsec: { combat: 54, instinct: 40, speed: 38, armor: 3, dr: 1, health: 13, hits: 2, weapon: "service-carbine", image: "icons/svg/shield.svg" },
  security: { combat: 52, instinct: 39, speed: 37, armor: 2, dr: 1, health: 12, hits: 2, weapon: "smg", image: "icons/svg/shield.svg" },
  riot: { combat: 50, instinct: 34, speed: 35, armor: 3, dr: 1, health: 14, hits: 2, weapon: "shock-maul", image: "icons/svg/explosion.svg" },
  blackops: { combat: 66, instinct: 52, speed: 57, armor: 4, dr: 2, health: 14, hits: 2, weapon: "silenced-carbine", image: "icons/svg/cowled.svg" },
  stormer: { combat: 63, instinct: 41, speed: 48, armor: 4, dr: 2, health: 16, hits: 3, weapon: "storm-blade", image: "icons/svg/bones.svg" },
  carrien: { combat: 57, instinct: 52, speed: 59, armor: 2, dr: 0, health: 13, hits: 2, weapon: "claws", image: "icons/svg/bones.svg" },
  "retrieval-crew": { combat: 53, instinct: 37, speed: 49, armor: 2, dr: 1, health: 12, hits: 2, weapon: "machine-pistol", image: "icons/svg/skull.svg" }
};

const WEAPON_LIBRARY = {
  none: null,
  holdout: { name: "Stern Holdout", damage: "1d10", range: "Short", damageType: "impaling", skillRef: "Firearm (Pistol)", special: "concealable", weight: 0.8, woundEffect: "Gunshot" },
  "heavy-pistol": { name: "FEN 203 Heavy Pistol", damage: "1d10+1", range: "Short", damageType: "impaling", skillRef: "Firearm (Pistol)", special: "stopping power", weight: 1.2, woundEffect: "Gunshot" },
  "machine-pistol": { name: "FEN 209 Machine Pistol", damage: "1d8", range: "15m", damageType: "impaling", skillRef: "Firearm (SMG)", special: "burst", weight: 1.5, woundEffect: "Gunshot" },
  smg: { name: "FEN 204 SMG", damage: "1d10", range: "30m", damageType: "impaling", skillRef: "Firearm (SMG)", special: "auto", weight: 2.8, woundEffect: "Gunshot" },
  "service-carbine": { name: "Shiver Service Carbine", damage: "1d10+1", range: "50m", damageType: "impaling", skillRef: "Firearm (Rifle)", special: "single / burst", weight: 3.4, woundEffect: "Gunshot" },
  "silenced-carbine": { name: "Silent Service Carbine", damage: "1d10+2", range: "50m", damageType: "impaling", skillRef: "Firearm (Rifle)", special: "suppressed", weight: 3.2, woundEffect: "Gunshot" },
  shotgun: { name: "Riot Shotgun", damage: "2d6", range: "Close", damageType: "blunt", skillRef: "Firearm (Shotgun)", special: "spread", weight: 3.7, woundEffect: "Blunt Force" },
  "shock-maul": { name: "Shock Maul", damage: "1d10", range: "Close", damageType: "blunt", skillRef: "Melee Club", special: "stun arcs", weight: 2.9, woundEffect: "Blunt Force" },
  "storm-blade": { name: "Storm Blade", damage: "2d6", range: "Close", damageType: "cutting", skillRef: "Melee Blade 2H", special: "heavy cleave", weight: 4.4, woundEffect: "Gore & Massive" },
  claws: { name: "Carrien Claws", damage: "1d10", range: "Close", damageType: "rending", skillRef: "Brawl", special: "bleed", weight: 0, woundEffect: "Gore & Massive" }
};

function getHtmlRoot(html) {
  return html instanceof HTMLElement ? html : html?.[0] ?? null;
}

async function loadTables() {
  if (TABLES) return TABLES;
  const response = await fetch("modules/sla-bpn-dispatch/data/bpn-tables.json");
  TABLES = await response.json();
  return TABLES;
}

function pick(array) {
  return Array.isArray(array) && array.length ? array[Math.floor(Math.random() * array.length)] : "";
}

function rollDie(faces) {
  return Math.floor(Math.random() * faces) + 1;
}

function padNumber(n, width = 3) {
  return String(n).padStart(width, "0");
}

function slugify(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getColourAccent(key = "white") {
  const accents = {
    blue: "#57b3ff",
    yellow: "#ffdb6e",
    green: "#78d48f",
    white: "#dce8f9",
    grey: "#9da6b3",
    silver: "#d7dee8",
    jade: "#41d0a3",
    red: "#ff6f6f",
    black: "#9a7cff",
    platinum: "#f5f0d7"
  };
  return accents[key] ?? accents.white;
}

function bpnIconPath(key = "white") {
  const normalized = String(key ?? "white").toLowerCase();
  return `modules/${MODULE_ID}/assets/bpn-${normalized}.svg`;
}

function formatScl(value = 0) {
  const number = Number(value ?? 0);
  if (!Number.isFinite(number)) return "+0.0";
  const fixed = Math.abs(number) >= 1 ? number.toFixed(1) : number.toFixed(2);
  const trimmed = fixed.replace(/\.?0+$/, "");
  return `${number >= 0 ? "+" : ""}${trimmed}`;
}

function creditsFromRange(range = { min: 0, max: 0 }, tier = "mid") {
  const min = Number(range?.min ?? 0);
  const max = range?.max === null || range?.max === undefined ? null : Number(range.max);
  if (!Number.isFinite(min)) return 0;
  if (max === null || !Number.isFinite(max)) {
    if (tier === "low") return Math.round(min);
    if (tier === "mid") return Math.round(min * 1.15);
    return Math.round(min * 1.35);
  }
  if (tier === "low") return Math.round(min);
  if (tier === "high") return Math.round(max);
  return Math.round((min + max) / 2);
}

function tierFromRoll(roll = 1) {
  if (roll <= 2) return "low";
  if (roll <= 4) return "mid";
  return "high";
}

function mediaFromRoll(roll = 1) {
  if (roll <= 1) return "None";
  if (roll <= 3) return "Station Analysis";
  if (roll <= 5) return "Third Eye News";
  return "GoreZone / Contract Circuit Special";
}

function objectiveFromFocus(focusText = "") {
  const text = String(focusText ?? "").toLowerCase();
  if (text.includes("eliminate")) return "Neutralise the designated threat and confirm status.";
  if (text.includes("escort") || text.includes("protect")) return "Keep the protected asset moving and alive through the full route.";
  if (text.includes("retrieve")) return "Recover the designated item, data, or specimen intact and preserve chain of custody.";
  if (text.includes("investigate")) return "Identify culprit(s), secure evidence, and produce an admissible corporate finding.";
  if (text.includes("contain") || text.includes("quarantine")) return "Lock the threat down before it jumps sectors.";
  if (text.includes("riot") || text.includes("crowd")) return "Restore order without losing the public narrative.";
  if (text.includes("hunt")) return "Track, isolate, and capture or terminate the named target.";
  if (text.includes("clean up")) return "Recover all traces of the prior SLA incident before public disclosure.";
  if (text.includes("sabotage") || text.includes("destroy")) return "Disable the objective and leave a believable false story behind.";
  return "Complete the assigned contract objective and report all outcomes.";
}

function cleanupDirectiveFromColour(colourKey = "blue") {
  const key = String(colourKey ?? "blue").toLowerCase();
  if (key === "blue") return "Restore basic street function and hand the site back looking manageable.";
  if (key === "yellow") return "Protect the recovered asset’s chain of custody at all times.";
  if (key === "white") return "Return with evidence, witnesses, and a narrative command can sign off on.";
  if (key === "silver") return "Keep public optics sponsor-safe from briefing to extraction.";
  if (key === "jade") return "Seal contamination and route all samples through Karma only.";
  if (key === "red") return "Stabilise the zone first, then explain it to the cameras.";
  if (key === "black") return "Remove traces, minimise witnesses, and suppress operational signatures.";
  if (key === "platinum") return "Preserve classification and return all material to Head Office only.";
  return "Recover evidence, suppress compromising exposure, and file a command-ready debrief.";
}

function colourByKey(tables, key = "white") {
  const normalized = String(key ?? "white").toLowerCase();
  return tables.colours.find((colour) => colour.key === normalized) ?? tables.colours[0];
}

function rollColourFromTable(tables) {
  const roll = rollDie(20);
  const entry = tables.colourRollTable.find((row) => roll >= row.min && roll <= row.max) ?? tables.colourRollTable[0];
  return { roll, colour: colourByKey(tables, entry.key) };
}

function resolveSelection(value, fallback = "") {
  return String(value ?? "").trim() || String(fallback ?? "").trim();
}

function buildBpnId(colour) {
  return `${colour.label.toUpperCase().slice(0, 2)}-${padNumber(rollDie(999))}-${padNumber(rollDie(999))}`;
}

function squadSizeValue(value) {
  const numeric = Number(value ?? 4);
  if (!Number.isFinite(numeric)) return 4;
  return Math.max(1, Math.min(8, Math.round(numeric)));
}

function getScenarioFramesForColour(key = "white") {
  return SCENARIO_FRAMES[key] ?? SCENARIO_FRAMES.white;
}

function frameByKey(colourKey, frameKey) {
  return getScenarioFramesForColour(colourKey).find((frame) => frame.id === frameKey) ?? null;
}

function chooseScenarioFrame(colourKey, requestedFrameKey = "") {
  const existing = requestedFrameKey ? frameByKey(colourKey, requestedFrameKey) : null;
  if (existing) return existing;
  return pick(getScenarioFramesForColour(colourKey));
}

function buildContactName(tables) {
  return `${pick(tables.contactFirstNames)} ${pick(tables.contactLastNames)}`;
}

function buildPrimaryContact(frame, tables, fallback = "") {
  if (String(fallback ?? "").trim()) return String(fallback).trim();
  return `${buildContactName(tables)} - ${frame.contactRole}`;
}

function rewardPackageForColour(colour, input = {}) {
  const paymentTypeRoll = rollDie(6);
  const cbsTierRoll = rollDie(6);
  const sclTierRoll = rollDie(6);
  const mediaRoll = rollDie(6);
  const financierRoll = rollDie(6);

  const squadSize = squadSizeValue(input.squadSize);
  const paymentType = input.paymentType && input.paymentType !== "__RANDOM__"
    ? String(input.paymentType)
    : (paymentTypeRoll <= 4 ? "Per Squad" : "Per Operative");
  const cbsTier = tierFromRoll(cbsTierRoll);
  const sclTier = tierFromRoll(sclTierRoll);

  const grossPerOp = creditsFromRange(colour.cbsPerOpRange, cbsTier);
  const grossPerSquad = creditsFromRange(colour.cbsPerSquadRange, cbsTier);
  const grossContract = paymentType === "Per Operative" ? grossPerOp * squadSize : grossPerSquad;
  const financierCutPercent = input.financierCutPercent
    ? Number(input.financierCutPercent)
    : (financierRoll <= 2 ? 10 : financierRoll <= 4 ? 15 : 20);
  const netContract = Math.max(0, Math.round(grossContract * (1 - financierCutPercent / 100)));
  const estimatedTakeHomeEach = Math.max(1, Math.floor(netContract / squadSize));

  const sclByTier = {
    low: Number(colour.sclRange?.min ?? 0.1),
    mid: Number(colour.sclRange?.typical ?? colour.sclRange?.min ?? 0.1),
    high: Number(colour.sclRange?.max ?? colour.sclRange?.typical ?? 0.2)
  };
  const sclIncreaseValue = formatScl(sclByTier[sclTier] ?? sclByTier.mid);

  return {
    paymentType,
    cbsTier,
    sclTier,
    grossPerOp,
    grossPerSquad,
    grossContract,
    netContract,
    estimatedTakeHomeEach,
    financierCutPercent,
    cbsBandOp: `${colour.cbsPerOpRange?.min ?? 0}c - ${colour.cbsPerOpRange?.max ?? "?"}c`,
    cbsBandSquad: `${colour.cbsPerSquadRange?.min ?? 0}c - ${colour.cbsPerSquadRange?.max ?? "?"}c`,
    sclIncreaseValue,
    mediaCoverage: input.mediaCoverage && input.mediaCoverage !== "__RANDOM__"
      ? String(input.mediaCoverage)
      : mediaFromRoll(mediaRoll),
    notes: `Financier cut assumed at ${financierCutPercent}%. Estimated take-home is after the financier slice and split across ${squadSize} Operatives.`,
    rolls: {
      paymentType: paymentTypeRoll,
      cbsTier: cbsTierRoll,
      sclTier: sclTierRoll,
      media: mediaRoll,
      financier: financierRoll
    }
  };
}

function buildMissionBrief(draft) {
  return [
    `${draft.issuingDepartment} has issued ${draft.bpnId}, a ${draft.colourLabel.toUpperCase()} ${draft.colourType.toLowerCase()} contract.`,
    `${draft.primaryContact} wants the squad to ${objectiveFromFocus(draft.missionFocus).toLowerCase()}`,
    `The operational spine runs through ${draft.location.toLowerCase()}, where ${draft.colourMissionIdea.toLowerCase()}`,
    `Expect ${draft.opposition.toLowerCase()}, who ${draft.oppositionAttitude.toLowerCase()}`,
    `${draft.complication}`,
    `If the squad loses tempo, ${draft.escalationEvent.toLowerCase()}`,
    `Media posture is ${draft.mediaCoverage.toLowerCase()}, and command expects a clean narrative.`
  ].join(" ");
}

function defaultDraft() {
  return {
    shortTitle: "Sector Sweep",
    frameKey: "",
    bpnId: "WH-201-771",
    colourKey: "white",
    colourLabel: "White",
    colourType: "Investigation",
    colourSummary: "",
    colourDetails: "",
    colourAccent: getColourAccent("white"),
    iconPath: bpnIconPath("white"),
    issuingDepartment: "Mort Department / Ops Control",
    squadSize: 4,
    primaryContact: "",
    primaryContactLocation: "",
    sclRequirement: "10 - 7",
    paymentType: "Per Squad",
    mediaCoverage: "Station Analysis",
    missionFocus: "",
    colourMissionIdea: "",
    location: "",
    atmosphere: "",
    opposition: "",
    oppositionAttitude: "",
    civilianFaction: "",
    extraObjective: "",
    escalationEvent: "",
    complication: "",
    localTwist: "",
    missionBrief: "",
    grossContract: "0c",
    estimatedTakeHomeEach: "0c",
    financierCut: "15%",
    sclIncrease: "+0.1",
    cbsBand: "",
    operationalNotes: "",
    threatLead: "",
    threatCountLabel: "",
    npcSummary: "",
    generatedNpcLinks: []
  };
}

function draftFromReward(base, reward) {
  return {
    ...base,
    grossContract: `${reward.grossContract}c (${reward.paymentType})`,
    estimatedTakeHomeEach: `${reward.estimatedTakeHomeEach}c each`,
    financierCut: `${reward.financierCutPercent}%`,
    sclIncrease: reward.sclIncreaseValue,
    mediaCoverage: reward.mediaCoverage,
    cbsBand: `${reward.cbsBandOp} per Op / ${reward.cbsBandSquad} per Squad`,
    reward
  };
}

function getDraft() {
  return foundry.utils.mergeObject(defaultDraft(), game.settings.get(MODULE_ID, DRAFT_KEY) ?? {});
}

async function setDraft(draft) {
  const safeDraft = foundry.utils.deepClone(draft ?? {});
  delete safeDraft.reward;
  delete safeDraft.generatedNpcLinks;
  await game.settings.set(MODULE_ID, DRAFT_KEY, foundry.utils.mergeObject(defaultDraft(), safeDraft));
}

async function composeDraft(input = {}, { randomizeMissing = false } = {}) {
  const tables = await loadTables();
  const base = foundry.utils.mergeObject(defaultDraft(), input ?? {});
  const colourRoll = randomizeMissing || !String(base.colourKey ?? "").trim()
    ? rollColourFromTable(tables)
    : { roll: 0, colour: colourByKey(tables, base.colourKey) };
  const colour = colourRoll.colour;
  const frame = chooseScenarioFrame(colour.key, randomizeMissing ? "" : base.frameKey);

  const reward = rewardPackageForColour(colour, base);
  const draft = draftFromReward({
    ...base,
    frameKey: frame.id,
    bpnId: resolveSelection(base.bpnId, randomizeMissing ? buildBpnId(colour) : buildBpnId(colour)),
    shortTitle: resolveSelection(base.shortTitle, frame.shortTitle),
    colourKey: colour.key,
    colourLabel: colour.label,
    colourType: colour.type,
    colourSummary: colour.summary,
    colourDetails: colour.details,
    colourAccent: getColourAccent(colour.key),
    iconPath: bpnIconPath(colour.key),
    issuingDepartment: resolveSelection(base.issuingDepartment, frame.issuingDepartment),
    squadSize: squadSizeValue(base.squadSize),
    primaryContact: buildPrimaryContact(frame, tables, base.primaryContact),
    primaryContactLocation: resolveSelection(base.primaryContactLocation, frame.contactLocation),
    sclRequirement: resolveSelection(base.sclRequirement, colour.sclReq),
    missionFocus: resolveSelection(base.missionFocus, frame.missionFocus),
    colourMissionIdea: resolveSelection(base.colourMissionIdea, frame.colourMissionIdea),
    location: resolveSelection(base.location, frame.location),
    atmosphere: resolveSelection(base.atmosphere, frame.atmosphere),
    opposition: resolveSelection(base.opposition, frame.opposition),
    oppositionAttitude: resolveSelection(base.oppositionAttitude, frame.oppositionAttitude),
    civilianFaction: resolveSelection(base.civilianFaction, frame.civilianFaction),
    extraObjective: resolveSelection(base.extraObjective, frame.extraObjective),
    escalationEvent: resolveSelection(base.escalationEvent, frame.escalationEvent),
    complication: resolveSelection(base.complication, frame.complication),
    localTwist: resolveSelection(base.localTwist, frame.localTwist),
    threatLead: resolveSelection(base.threatLead, frame.threatRole),
    threatCountLabel: resolveSelection(base.threatCountLabel, frame.threatCountLabel),
    npcSummary: `${frame.contactRole} / ${frame.threatRole}`,
    operationalNotes: String(base.operationalNotes ?? "").trim(),
    scenarioFrame: frame,
    generatedNpcLinks: Array.isArray(base.generatedNpcLinks) ? base.generatedNpcLinks : []
  }, reward);

  draft.missionBrief = resolveSelection(base.missionBrief, buildMissionBrief(draft));
  draft.rolls = {
    colour: colourRoll.roll,
    paymentType: reward.rolls.paymentType,
    cbsTier: reward.rolls.cbsTier,
    sclTier: reward.rolls.sclTier,
    media: reward.rolls.media,
    financier: reward.rolls.financier
  };
  return draft;
}

function compactChatHtml(draft) {
  const e = foundry.utils.escapeHTML;
  return `
    <section class="sla-bpn-chat">
      <header class="sla-bpn-chat__hero" style="--bpn-accent:${e(draft.colourAccent)};">
        <img class="sla-bpn-chat__icon" src="${e(draft.iconPath || bpnIconPath(draft.colourKey))}" alt="${e(draft.colourLabel)} BPN">
        <div class="sla-bpn-chat__heading">
          <div class="sla-bpn-chat__eyebrow">SLA Industries Dispatch</div>
          <h3>${e(draft.colourLabel)} BPN - ${e(draft.shortTitle)}</h3>
          <p>${e(draft.colourType)} // SCL ${e(draft.sclRequirement)} // ${e(draft.grossContract)}</p>
        </div>
      </header>
      <div class="sla-bpn-chat__body">
        <p class="sla-bpn-chat__brief">${e(draft.missionBrief)}</p>
        <div class="sla-bpn-chat__grid">
          <div><strong>Primary Contact</strong><span>${e(draft.primaryContact)}</span><em>${e(draft.primaryContactLocation)}</em></div>
          <div><strong>Threat Lead</strong><span>${e(draft.threatLead)}</span><em>${e(draft.threatCountLabel)}</em></div>
          <div><strong>Operational Hook</strong><span>${e(draft.colourMissionIdea)}</span></div>
          <div><strong>Extra Objective</strong><span>${e(draft.extraObjective)}</span></div>
        </div>
      </div>
    </section>
  `;
}

function playerHtml(draft) {
  const e = foundry.utils.escapeHTML;
  return `
    <section class="sla-bpn-journal" style="--bpn-accent:${e(draft.colourAccent)};">
      <header class="sla-bpn-journal__hero">
        <img class="sla-bpn-journal__icon" src="${e(draft.iconPath || bpnIconPath(draft.colourKey))}" alt="${e(draft.colourLabel)} BPN">
        <div>
          <div class="sla-bpn-journal__eyebrow">SLA Industries / Corporate Dispatch</div>
          <h2>${e(draft.colourLabel)} BPN - ${e(draft.shortTitle)}</h2>
          <p>${e(draft.colourType)} // ${e(draft.colourSummary)}</p>
        </div>
      </header>
      <section class="sla-bpn-journal__meta">
        <div><strong>BPN ID</strong><span>${e(draft.bpnId)}</span></div>
        <div><strong>SCL Requirement</strong><span>${e(draft.sclRequirement)}</span></div>
        <div><strong>Gross Contract</strong><span>${e(draft.grossContract)}</span></div>
        <div><strong>Take-Home</strong><span>${e(draft.estimatedTakeHomeEach)}</span></div>
      </section>
      <section class="sla-bpn-journal__briefing">
        <h3>Mission Brief</h3>
        <p>${e(draft.missionBrief)}</p>
      </section>
      <section class="sla-bpn-journal__grid">
        <div><strong>Mission Focus</strong><span>${e(draft.missionFocus)}</span></div>
        <div><strong>Operational Hook</strong><span>${e(draft.colourMissionIdea)}</span></div>
        <div><strong>Primary Objective</strong><span>${e(objectiveFromFocus(draft.missionFocus))}</span></div>
        <div><strong>Extra Objective</strong><span>${e(draft.extraObjective)}</span></div>
        <div><strong>Location</strong><span>${e(draft.location)}</span></div>
        <div><strong>Atmosphere</strong><span>${e(draft.atmosphere)}</span></div>
        <div><strong>Expected Opposition</strong><span>${e(draft.opposition)}</span></div>
        <div><strong>Opposition Attitude</strong><span>${e(draft.oppositionAttitude)}</span></div>
        <div><strong>Primary Contact</strong><span>${e(draft.primaryContact)}</span></div>
        <div><strong>Contact Position</strong><span>${e(draft.primaryContactLocation)}</span></div>
        <div><strong>Civilian Pressure</strong><span>${e(draft.civilianFaction)}</span></div>
        <div><strong>Complication</strong><span>${e(draft.complication)}</span></div>
        <div><strong>Escalation Trigger</strong><span>${e(draft.escalationEvent)}</span></div>
        <div><strong>Cleanup Directive</strong><span>${e(cleanupDirectiveFromColour(draft.colourKey))}</span></div>
      </section>
      <section class="sla-bpn-journal__meta">
        <div><strong>Media Coverage</strong><span>${e(draft.mediaCoverage)}</span></div>
        <div><strong>CBS Band</strong><span>${e(draft.cbsBand)}</span></div>
        <div><strong>Financier Cut</strong><span>${e(draft.financierCut)}</span></div>
        <div><strong>SCL Increase</strong><span>${e(draft.sclIncrease)}</span></div>
      </section>
      ${draft.operationalNotes ? `<section class="sla-bpn-journal__briefing"><h3>Operational Notes</h3><p>${e(draft.operationalNotes)}</p></section>` : ""}
    </section>
  `;
}

function gmHtml(draft, playerEntryUuid = "", npcLinks = []) {
  const e = foundry.utils.escapeHTML;
  const playerLink = playerEntryUuid ? `@UUID[${playerEntryUuid}]{Player BPN Brief}` : "Player BPN Brief";
  const npcBlock = npcLinks.length
    ? `<ul>${npcLinks.map((entry) => `<li>@UUID[${entry.uuid}]{${e(entry.name)}}</li>`).join("")}</ul>`
    : "<p>No NPC actors created.</p>";
  return `
    <section>
      <h2>GM Debrief - ${e(draft.shortTitle)}</h2>
      <p><strong>Linked Brief:</strong> ${playerLink}</p>
      <p><strong>True Pressure Point:</strong> ${e(draft.complication)}</p>
      <p><strong>Operational Twist:</strong> ${e(draft.localTwist)}</p>
      <p><strong>Threat Read:</strong> ${e(draft.threatLead)} // ${e(draft.threatCountLabel)}</p>
      <p><strong>Opposition Attitude:</strong> ${e(draft.oppositionAttitude)}</p>
      <p><strong>Financier Note:</strong> ${e(draft.reward?.notes ?? "")}</p>
      <p><strong>Levers:</strong> ${e(draft.civilianFaction)} If pressure rises, ${e(draft.escalationEvent.toLowerCase())}.</p>
      <hr>
      <h3>Generated NPCs</h3>
      ${npcBlock}
      <hr>
      <p><strong>Roll State:</strong> Colour ${Number(draft.rolls?.colour ?? 0)}, payment ${Number(draft.rolls?.paymentType ?? 0)}, CBS ${Number(draft.rolls?.cbsTier ?? 0)}, SCL ${Number(draft.rolls?.sclTier ?? 0)}, media ${Number(draft.rolls?.media ?? 0)}, financier ${Number(draft.rolls?.financier ?? 0)}.</p>
    </section>
  `;
}

function buildWeaponPayload(weaponKey) {
  const weapon = WEAPON_LIBRARY[weaponKey];
  if (!weapon) return null;
  return {
    name: weapon.name,
    type: "weapon",
    system: {
      damage: weapon.damage,
      weight: weapon.weight,
      cost: 0,
      carryState: "equipped",
      equipped: true,
      useAmmo: false,
      ammo: 0,
      shots: 0,
      curShots: 0,
      bonus: 0,
      woundEffect: weapon.woundEffect,
      ranges: { short: 0, medium: 0, long: 0, value: weapon.range },
      sla: {
        weaponType: weapon.skillRef,
        skillRef: weapon.skillRef,
        damageType: weapon.damageType,
        fireModes: weapon.special,
        currentFireMode: weapon.special,
        special: weapon.special,
        notes: [weapon.special]
      }
    }
  };
}

function actorPayloadFromArchetype({ name, profile, role, location, description, bpnId, colourKey, folderId, image }) {
  return {
    name,
    type: "creature",
    img: image || profile.image || "icons/svg/mystery-man.svg",
    folder: folderId,
    ownership: { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE },
    flags: {
      [MODULE_ID]: {
        generated: true,
        role,
        bpnId,
        colourKey
      }
    },
    system: {
      description: `${description}\n\nAssigned location: ${location}`,
      notes: `${role} // ${location}`,
      health: { value: profile.health, max: profile.health },
      hits: { value: 0, max: profile.hits },
      stats: {
        combat: { value: profile.combat, enabled: true },
        instinct: { value: profile.instinct, enabled: true },
        speed: { value: profile.speed, enabled: true },
        loyalty: { value: profile.loyalty ?? 0, enabled: Number.isFinite(profile.loyalty) },
        sanity: { value: 35, enabled: true },
        armor: {
          value: profile.armor,
          mod: profile.armor,
          damageReduction: profile.dr,
          cover: profile.armor >= 4 ? "heavy" : profile.armor >= 2 ? "light" : "none",
          enabled: true
        }
      }
    }
  };
}

async function ensureFolder(name, type, parent = null) {
  let folder = game.folders.find((entry) => entry.type === type && entry.name === name && (entry.folder?.id ?? null) === (parent?.id ?? null));
  if (folder) return folder;
  return Folder.create({ name, type, folder: parent?.id ?? null, color: "#39414e" });
}

async function createNpcActorsForDraft(draft) {
  const frame = draft.scenarioFrame;
  if (!frame) return [];

  const rootFolder = await ensureFolder(ACTOR_FOLDER_NAME, "Actor");
  const folder = await ensureFolder(`${draft.bpnId} - ${draft.shortTitle}`, "Actor", rootFolder);
  const existing = game.actors.filter((actor) => actor.folder?.id === folder.id && actor.flags?.[MODULE_ID]?.generated);
  if (existing.length) await Actor.deleteDocuments(existing.map((actor) => actor.id));

  const tables = await loadTables();
  const contactName = draft.primaryContact.split(" - ")[0]?.trim() || buildContactName(tables);
  const contactProfile = CONTACT_ARCHETYPES[frame.contactArchetype] ?? CONTACT_ARCHETYPES.detective;
  const threatProfile = THREAT_ARCHETYPES[frame.threatArchetype] ?? THREAT_ARCHETYPES.ganger;
  const threatNameBase = frame.threatArchetype === "carrien"
    ? `${draft.shortTitle} Alpha`
    : `${buildContactName(tables)} "${frame.threatRole}"`;

  const contactActor = await Actor.create(actorPayloadFromArchetype({
    name: contactName,
    profile: contactProfile,
    role: frame.contactRole,
    location: draft.primaryContactLocation,
    description: `${frame.contactRole} assigned to ${draft.bpnId}. ${draft.primaryContact} is the authorised operational voice on-site.`,
    bpnId: draft.bpnId,
    colourKey: draft.colourKey,
    folderId: folder.id,
    image: contactProfile.image
  }), { renderSheet: false });

  const threatActor = await Actor.create(actorPayloadFromArchetype({
    name: threatNameBase,
    profile: threatProfile,
    role: frame.threatRole,
    location: draft.location,
    description: `${frame.threatRole} connected to ${draft.bpnId}. ${draft.opposition} ${draft.oppositionAttitude}`,
    bpnId: draft.bpnId,
    colourKey: draft.colourKey,
    folderId: folder.id,
    image: threatProfile.image
  }), { renderSheet: false });

  const contactWeapon = buildWeaponPayload(contactProfile.weapon);
  const threatWeapon = buildWeaponPayload(threatProfile.weapon);
  if (contactWeapon) await contactActor.createEmbeddedDocuments("Item", [contactWeapon]);
  if (threatWeapon) await threatActor.createEmbeddedDocuments("Item", [threatWeapon]);

  const roster = [
    { name: contactActor.name, uuid: contactActor.uuid },
    { name: threatActor.name, uuid: threatActor.uuid }
  ];
  draft.generatedNpcLinks = roster;
  return roster;
}

class SlaBpnDispatchApp extends FormApplication {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "sla-bpn-dispatch-app",
      title: "SLA BPN Dispatch",
      template: "modules/sla-bpn-dispatch/templates/bpn-dispatch.hbs",
      classes: ["sla-bpn-dispatch"],
      width: 980,
      height: 900,
      closeOnSubmit: false,
      submitOnChange: false,
      resizable: true
    });
  }

  async getData() {
    const tables = await loadTables();
    const draft = await composeDraft(getDraft(), { randomizeMissing: false });
    return {
      draft,
      colourOptions: tables.colours.map((colour) => ({ key: colour.key, label: colour.label })),
      frameOptions: getScenarioFramesForColour(draft.colourKey).map((frame) => ({ key: frame.id, label: frame.shortTitle }))
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find("[data-action='randomize']").on("click", async () => {
      const draft = await composeDraft({}, { randomizeMissing: true });
      await setDraft(draft);
      this.render(false);
    });
    html.find("[data-action='journal']").on("click", async () => {
      const draft = await this._collectDraft();
      const npcLinks = await createNpcActorsForDraft(draft);
      await setDraft(draft);
      const playerEntry = await JournalEntry.create({
        name: `${draft.colourLabel} BPN - ${draft.shortTitle}`,
        img: draft.iconPath || bpnIconPath(draft.colourKey),
        ownership: { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE },
        pages: [{ name: "Mission Brief", type: "text", text: { content: playerHtml(draft) } }]
      }, { renderSheet: false });
      await JournalEntry.create({
        name: `${draft.colourLabel} BPN - ${draft.shortTitle} - GM Debrief`,
        img: draft.iconPath || bpnIconPath(draft.colourKey),
        ownership: { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.NONE },
        pages: [{ name: "GM Debrief", type: "text", text: { content: gmHtml(draft, playerEntry?.uuid ?? "", npcLinks) } }]
      }, { renderSheet: false });
      ui.notifications.info(`Created BPN journals and ${npcLinks.length} generated NPC actors for ${draft.shortTitle}.`);
    });
    html.find("[data-action='chat']").on("click", async () => {
      const draft = await this._collectDraft();
      await setDraft(draft);
      await ChatMessage.create({
        user: game.user.id,
        speaker: { alias: "SLA BPN Dispatch" },
        content: compactChatHtml(draft)
      });
    });
    html.find("[data-action='save']").on("click", async () => {
      const draft = await this._collectDraft();
      await setDraft(draft);
      this.render(false);
      ui.notifications.info("SLA BPN draft saved.");
    });
    html.find("select[name='colourKey'], select[name='frameKey']").on("change", async () => {
      const draft = await this._collectDraft();
      await setDraft(draft);
      this.render(false);
    });
  }

  async _collectDraft() {
    const fd = new foundry.applications.ux.FormDataExtended(this.form);
    return composeDraft(fd.object, { randomizeMissing: false });
  }

  async _updateObject(_event, formData) {
    const draft = await composeDraft(formData, { randomizeMissing: false });
    await setDraft(draft);
    ui.notifications.info("SLA BPN draft saved.");
  }

  static open() {
    return new SlaBpnDispatchApp().render(true);
  }
}

function appendOpenButton(root, selector, className, label) {
  const header = root?.querySelector(selector);
  if (!header || header.querySelector(`.${className}`)) return false;
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.innerHTML = `<i class="fas fa-file-contract"></i> ${label}`;
  button.addEventListener("click", () => SlaBpnDispatchApp.open());
  header.appendChild(button);
  return true;
}

function ensureLaunchRow(root, parentSelector, rowClass) {
  const parent = root?.querySelector(parentSelector);
  if (!parent) return null;
  let row = parent.querySelector(`.${rowClass}`);
  if (row) return row;
  row = document.createElement("div");
  row.className = rowClass;
  parent.appendChild(row);
  return row;
}

function installJournalButton(_app, html) {
  if (!game.user?.isGM) return;
  const root = getHtmlRoot(html);
  const launchRow = ensureLaunchRow(root, ".directory-header", "sla-bpn-dispatch-launch-row");
  if (launchRow && !launchRow.querySelector(".sla-bpn-dispatch-open")) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "sla-bpn-dispatch-open";
    button.innerHTML = `<i class="fas fa-file-contract"></i> BPN Dispatch`;
    button.addEventListener("click", () => SlaBpnDispatchApp.open());
    launchRow.appendChild(button);
    return;
  }
  appendOpenButton(root, ".directory-header .header-actions, .directory-header .action-buttons", "sla-bpn-dispatch-open", "BPN Dispatch");
}

function installSettingsButton(_app, html) {
  if (!game.user?.isGM) return;
  const root = getHtmlRoot(html);
  appendOpenButton(root, ".settings-sidebar #game-details, .settings-sidebar .directory-header .header-actions, .settings-sidebar .action-buttons", "sla-bpn-dispatch-settings-open", "BPN Dispatch");
}

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, DRAFT_KEY, {
    scope: "world",
    config: false,
    type: Object,
    default: defaultDraft()
  });
  game.settings.registerMenu(MODULE_ID, "bpnDispatchMenu", {
    name: "SLA BPN Dispatch",
    label: "Open BPN Dispatch",
    hint: "Create richer SLA BPN briefings, GM debriefs, and generated NPC actors.",
    icon: "fas fa-file-contract",
    type: SlaBpnDispatchApp,
    restricted: true
  });
});

Hooks.on("renderJournalDirectory", installJournalButton);
Hooks.on("renderSettings", installSettingsButton);
