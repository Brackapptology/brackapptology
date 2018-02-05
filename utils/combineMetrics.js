function combineMetrics(bpi, kpi, nolan) {
  for (let j = 0; j < bpi.length; j++) {
    let bpiObj = bpi[j];
    for (let i = 0; i < nolan.length; i++) {
      let nolanObj = nolan[i];
      if (bpiObj.team === nolanObj.team && !nolanObj.bpi) {
        nolanObj = Object.assign(nolanObj, bpiObj)
      }
    }
  }

  for (let j = 0; j < kpi.length; j++) {
    let kpiObj = kpi[j];
    for (let i = 0; i < nolan.length; i++) {
      let nolanObj = nolan[i];
      if (kpiObj.team === nolanObj.team && !nolanObj.kpi) {
        nolanObj = Object.assign(nolanObj, kpiObj)
      }
    }
  }

  const teams = nolan.map(teamObj => {
    if ((teamObj.rpi && teamObj.rpi < 86) || teamObj.isChamp === true) {
      return teamObj
    }
  })

  const field = teams.filter(team => {
    return team !== undefined
  })

  return { data: field };

}

module.exports = combineMetrics;