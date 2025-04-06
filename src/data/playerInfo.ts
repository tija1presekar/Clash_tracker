const basicInfo = (player: any) => {
  const infos = [
    {
      name: 'League',
      value: player.league.iconUrls.small,
      title: player.league.name,
    },
    {
      name: 'Name',
      value: player.name,
    },
    {
      name: 'Tag',
      value: player.tag,
    },
    {
      name: 'Exp level',
      value: player.expLevel,
    },
    {
      name: 'Town hall level',
      value: player.townHallLevel,
    },
    {
      name: 'Builder hall level',
      value: player.builderHallLevel,
    },
    {
      name: 'Trophies',
      value: player.trophies,
    },
    {
      name: 'Builder trophies',
      value: player.builderTrophies,
    },
    {
      name: 'Best trophies',
      value: player.bestTrophies,
    },
    {
      name: 'Best builder trophies',
      value: player.bestBuilderTrophies,
    },
    {
      name: 'War stars',
      value: player.warStars,
    },
    {
      name: 'Clan capital contributions',
      value: player.clanCapitalContributions,
    },
    {
      name: 'Achievements',
      value: player.achievements.length,
    },
    {
      name: 'Labels',
      value: player.labels.map((label: any) => label).join(', '),
    },
  ];

  return infos;
};

const clanInfo = (player: any) => {
  const infos = [
    {
      name: 'Clan Badge',
      value: player.clan.badgeUrls.small,
    },
    {
      name: 'Clan name',
      value: player.clan.name,
    },
    {
      name: 'Clan tag',
      value: player.clan.tag,
    },
    {
      name: 'Clan level',
      value: player.clan.clanLevel,
    },
  ];

  return infos;
};

export { basicInfo, clanInfo };
