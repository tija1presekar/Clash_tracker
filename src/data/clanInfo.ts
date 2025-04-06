export const clanInfo = (clan: any) => {
  
  const info = [
    {
      name: 'Badge',
      value: clan.badgeUrls.small,
    },
    {
      name: 'Name',
      value: clan.name,
    },
    {
      name: 'Tag',
      value: clan.tag,
    },
    {
      name: 'Location',
      value: clan.location.name,
    },
    {
      name: 'Level',
      value: clan.clanLevel,
    },
    {
      name: 'Points',
      value: clan.clanPoints,
    },
    {
      name: 'Builder base points',
      value: clan.builderBasePoints,
    },
    {
      name: 'Required trophies',
      value: clan.requiredTrophies,
    },
    {
      name: 'Required builder trophies',
      value: clan.requiredBuilderBaseTrophies,
    },
    {
      name: 'War win streak',
      value: clan.warWinStreak,
    },
    {
      name: 'War wins',
      value: clan.warWins,
    },
    {
      name: 'War ties',
      value: clan.warTies,
    },
    {
      name: 'War losses',
      value: clan.warLosses,
    },
    {
      name: 'War League',
      value: clan.warLeague.name,
    },
    {
      name: 'Member count',
      value: clan.memberCount,
    },
    {
      name: 'Capital Hall level',
      value: clan.clanCapitalHallLevel,
    },
    {
      name: 'Capital Points',
      value: clan.capitalPoints,
    },
    {
      name: 'Capital League',
      value: clan.capitalLeague,
    },
    {
      name: 'Labels',
      value: clan.labels.map((label: any) => label.name).join(', '),
    }
  ]

  return info;
}

export const clanMembers = (clan: any) => {
  const memberInfo = clan.members.map((member: any) => {
    return {
      name: member.name,
      tag: member.tag,
      role: member.role,
      trophies: member.trophies,
      clanRank: member.clanRank,
      leagueIcon: member.league.iconUrls.small,
      donations: member.donations,
    }
  });

  return memberInfo;
};