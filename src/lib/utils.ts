import { Clan, Player } from 'clashofclans.js';
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function composePlayerInfoFromClass(info: Player) {
  const player = {
    name: info.name,
    tag: info.tag,
    townHallLevel: info.townHallLevel,
    league: {
      name: info.league.name,
      iconUrls: {
        small: info.league.icon.small,
      },
    },
    builderHallLevel: info.builderHallLevel,
    expLevel: info.expLevel,
    trophies: info.trophies,
    bestTrophies: info.bestTrophies,
    builderTrophies: info.builderBaseTrophies,
    bestBuilderTrophies: info.bestBuilderBaseTrophies,
    warStars: info.warStars,
    clanCapitalContributions: info.clanCapitalContributions,
    achievements: [
      ...info.achievements.map((achievement: any) => ({
        name: achievement.name,
        stars: achievement.stars,
        value: achievement.value,
        target: achievement.target,
        info: achievement.info,
        completionInfo: achievement.completionInfo,
      })),
    ],
    labels: [...info.labels.map((label: any) => label.name)],
    clan: {
      badgeUrls: {
        small: info.clan?.badge.small,
      },
      name: info.clan?.name,
      tag: info.clan?.tag,
      clanLevel: info.clan?.level,
    },
    troops: [
      ...info.troops.map((troop: any) => ({
        name: troop.name,
        level: troop.level,
        maxLevel: troop.maxLevel,
        village: troop.village,
        unlockBuilding: troop.unlockBuilding,
      })),
    ],
  };

  return player;
}

export function composeClanInfoFromClass(info: Clan) {
  const clan = {
    name: info.name,
    tag: info.tag,
    type: info.type,
    description: info.description,
    location: {
      id: info.location?.id,
      name: info.location?.name,
      countryCode: info.location?.countryCode,
      isCountry: info.location?.isCountry,
    },
    badgeUrls: {
      small: info.badge.small
    },
    clanLevel: info.level,
    clanPoints: info.points,
    requiredTrophies: info.requiredTrophies,
    requiredBuilderBaseTrophies: info.requiredBuilderBaseTrophies,
    requiredTownhallLevel: info.requiredTownHallLevel,
    builderBasePoints: info.builderBasePoints,
    warFrequency: info.warFrequency,
    warWinStreak: info.warWinStreak,
    warWins: info.warWins,
    warTies: info.warTies,
    warLosses: info.warLosses,
    isWarLogPublic: info.isWarLogPublic,
    warLeague: {
      id: info.warLeague?.id,
      name: info.warLeague?.name,
    },
    memberCount: info.memberCount,
    labels: [...info.labels.map((label) => {
      return {
        id: label.id,
        name: label.name,
        iconUrls: {
          small: label.iconUrls.small,
        },
      };
    })],
    clanCapitalHallLevel: info.clanCapital?.capitalHallLevel,
    isFamilyFriendly: info.isFamilyFriendly,
    capitalPoints: info.capitalPoints,
    capitalLeague: info.capitalLeague?.name,
    members: [...info.members.map((member: any) => {
      return {
        tag: member.tag,
        name: member.name,
        role: member.role,
        expLevel: member.expLevel,
        league: {
          id: member.league.id,
          name: member.league.name,
          iconUrls: {
            small: member.league.icon.small,
          },
        },
        trophies: member.trophies,
        versusTrophies: member.versusTrophies,
        clanRank: member.clanRank,
        previousClanRank: member.previousClanRank,
        donations: member.donations,
        donationsReceived: member.donationsReceived,
      };
    })],
  }

  return clan;
}