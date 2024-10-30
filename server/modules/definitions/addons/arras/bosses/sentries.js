const { combineStats, makeAuto, skillSet, menu } = require('../../../facilitators.js')
const { base } = require('../../../constants.js')
const g = require('../../../gunvals.js')

Class.arras_sentries = menu("Sentries", "pink", 3.5)
Class.arras_sentries.PROPS = [
    {
        POSITION: [9, 0, 0, 0, 360, 1],
        TYPE: "genericEntity"
    }
]
Class.arras_bosses.UPGRADES_TIER_0.push("arras_sentries")
    Class.arras_sentries.UPGRADES_TIER_0 = ["sentrySwarm", "sentryGun", "sentryTrap", "shinySentrySwarm", "shinySentryGun", "shinySentryTrap", "sentinelMinigun", "sentinelLauncher", "sentinelCrossbow"]

// shared stats
Class.arras_genericSentry = {
    PARENT: "genericTank",
    TYPE: "crasher",
    LABEL: "Sentry",
    DANGER: 3,
    COLOR: "pink",
    UPGRADE_COLOR: "pink",
    SHAPE: 3,
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8,
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal"],
    AI: {
        NO_LEAD: true,
    },
    BODY: {
        FOV: 0.5,
        ACCELERATION: 0.75,
        DAMAGE: base.DAMAGE,
        SPEED: 0.5 * base.SPEED,
        HEALTH: 0.3 * base.HEALTH,
    },
    MOTION_TYPE: "motor",
    FACING_TYPE: "smoothToTarget",
    HITS_OWN_TYPE: "hard",
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
}
Class.arras_genericShinySentry = {
    PARENT: "arras_genericSentry",
    COLOR: "lightGreen",
    UPGRADE_COLOR: "lightGreen",
    DANGER: 4,
    SIZE: 12,
    VALUE: 50000,
    SHAPE: 3,
    BODY: {
        HEALTH: 0.6 * base.HEALTH
    },
}
Class.arras_genericSentinel = {
    PARENT: "genericTank",
    TYPE: "crasher",
    LABEL: "Sentinel",
    DANGER: 7,
    COLOR: "purple",
    SHAPE: 5,
    SIZE: 13,
    SKILL: skillSet({
        rld: 0.7, //reload
        dam: 0.45, //bullet damage
        pen: 0.6, //bullet penetration
        str: 0.6, //bullet health
        atk: 0.5, //bullet speed
        spd: 0.6, //body damage
        hlt: 0.85, //max health
        shi: 0.45, //shield capacity
        rgn: 0.35, //shield regeneration
        mob: 0, //movement speed
    }),
    VALUE: 26668,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ["nearestDifferentMaster", "mapTargetToGoal", "minion"],
    AI: { NO_LEAD: true },
    BODY: {
        FOV: 0.8,
        ACCEL: 0.003,
        DAMAGE: base.DAMAGE * 2.1,
        SPEED: base.SPEED * 0.4,
        HEALTH: base.HEALTH * 2.1,
        SHIELD: base.SHIELD * 2.1,
        REGEN: base.REGEN * 0.15,
    },
    MOTION_TYPE: "motor",
    FACING_TYPE: "smoothToTarget",
    HITS_OWN_TYPE: "hard",
}

// sentries
Class.sentrySwarm = {
    PARENT: "arras_genericSentry",
    UPGRADE_LABEL: "Swarm Sentry",
    UPGRADE_COLOR: "pink",
    GUNS: [
        {
            POSITION: [7, 14, 0.6, 7, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, { recoil: 1.15, range: 0.9 }]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
            },
        },
    ],
}
Class.sentryGun = makeAuto("arras_genericSentry", "Sentry", {
    type: "megaAutoTankGun",
    size: 12,
})
Class.sentryGun.UPGRADE_LABEL = "Gun Sentry";
Class.sentryTrap = makeAuto("arras_genericSentry", "Sentry", {
    type: "trapTurret",
    size: 12,
})
Class.sentryTrap.UPGRADE_LABEL = "Trap Sentry";

// sentry minions
Class.sentrySwarmMinion = {
    PARENT: 'drone',
    LABEL: 'sentry',
    COLOR: 'pink',
    UPGRADE_COLOR: "pink",
    DRAW_HEALTH: true,
    HAS_NO_RECOIL: true,
    GUNS: Class.sentrySwarm.GUNS
}
Class.sentryGunMinion = {
    PARENT: 'drone',
    LABEL: 'sentry',
    COLOR: 'pink',
    UPGRADE_COLOR: "pink",
    DRAW_HEALTH: true,
    HAS_NO_RECOIL: true,
    TURRETS: [{
        POSITION: [12, 0, 0, 0, 360, 1],
        TYPE: ['megaAutoTankGun', {GUN_STAT_SCALE: {health: 0.8}}]
    }]
}
Class.sentryTrapMinion = {
    PARENT: 'drone',
    LABEL: 'sentry',
    COLOR: 'pink',
    UPGRADE_COLOR: "pink",
    DRAW_HEALTH: true,
    HAS_NO_RECOIL: true,
    TURRETS: [{
        POSITION: [12, 0, 0, 0, 360, 1],
        TYPE: 'trapTurret'
    }]
}

// shiny sentries
Class.shinySentrySwarm = {
    PARENT: "arras_genericShinySentry",
    UPGRADE_LABEL: "Shiny Swarm Sentry",
    UPGRADE_COLOR: "lightGreen",
    GUNS: [
        {
            POSITION: [6, 11, 1.3, 7, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, { recoil: 1.15 }, g.machineGun, { reload: 0.25 }]),
                TYPE: "swarm",
                STAT_CALCULATOR: "swarm",
            },
        },
    ],
}
Class.shinySentryGun = makeAuto("arras_genericShinySentry", "Sentry", {
    type: "artilleryTurret",
    size: 12,
})
Class.shinySentryGun.UPGRADE_LABEL = "Shiny Gun Sentry";
Class.shinySentryTrap = makeAuto("arras_genericShinySentry", "Sentry", {
    type: "barricadeTurret",
    size: 12,
})
Class.shinySentryTrap.UPGRADE_LABEL = "Shiny Trap Sentry";

// sentinels
Class.sentinelLauncher = {
    PARENT: "arras_genericSentinel",
    UPGRADE_LABEL: "Missile Sentinel",
    UPGRADE_COLOR: "purple",
    GUNS: [
        {
            POSITION: [3, 12.45, -1.35, 17.2, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pounder, g.launcher]),
                TYPE: "sentinelMissile",
            },
        }, {
            POSITION: [17.5, 13, 1.25, 0, 0, 0, 0],
        }, {
            POSITION: [18.55, 20.25, 0.25, 1, 0, 0, 0],
        },
    ],
}
Class.sentinelCrossbow = {
    PARENT: "arras_genericSentinel",
    UPGRADE_LABEL: "Crossbow Sentinel",
    UPGRADE_COLOR: "purple",
    GUNS: [
        {
            POSITION: [15, 2.5, 1, 0, 3.5, 35/2, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, { speed: 0.7, maxSpeed: 0.7 }, g.crossbow, { recoil: 0.5 }]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [15, 2.5, 1, 0, -3.5, -35/2, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, { speed: 0.7, maxSpeed: 0.7 }, g.crossbow, { recoil: 0.5 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 3.5, 1, 0, 4, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, { speed: 0.7, maxSpeed: 0.7 }, g.crossbow, { recoil: 0.5 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [20, 3.5, 1, 0, -4, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, { speed: 0.7, maxSpeed: 0.7 }, g.crossbow, { recoil: 0.5 }]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [24, 7, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, { speed: 0.7, maxSpeed: 0.7, reload: 2, recoil: 0.5 }]),
                TYPE: "bullet",
            },
        },
    ],
}
Class.sentinelMinigun = {
    PARENT: "arras_genericSentinel",
    UPGRADE_LABEL: "Minigun Sentinel",
    UPGRADE_COLOR: "purple",
    GUNS: [
        {
            POSITION: [16, 7.5, 1, 0, 4.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.spam, g.spam]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [11.5, 7.5, -1.33, 1, 4.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.spam, g.spam]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [16, 7.5, 1, 0, -4.5, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.spam, g.spam]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [11.5, 7.5, -1.33, 1, -4.5, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.spam, g.spam]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [22.5, 9, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.spam, g.spam]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [20.4, 9, 1, 0, 0, 0, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.spam, g.spam]),
                TYPE: "bullet",
            },
        }, {
            POSITION: [18.3, 9, 1, 0, 0, 0, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minigun, g.twin, g.spam, g.spam]),
                TYPE: "bullet",
            },
        },
    ],
}
