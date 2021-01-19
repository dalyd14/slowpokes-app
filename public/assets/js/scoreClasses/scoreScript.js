var globalCurrentYear
var globalDisplayedYear
var globalDisplayedWeek

const populateFilters = (queryCurrentScores, queryTeams, isFootball) => {
    if (isFootball) {
        return [populateFootballFilter(queryCurrentScores), getTeamOptions(queryTeams)]
    } else {
        return [populateBasketballFilter(queryCurrentScores), getTeamOptions(queryTeams)]
    }
}

const populateFootballFilter = queryScore => {
    return new Promise((res, rej) => {
        callCustom(queryScore).then(result => {
            var options = getFootballOptions(result)
            res({options})
        })        
    })
}

const populateBasketballFilter = queryScore => {
    return new Promise((res, rej) => {
        years = `
        <option selected value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>`
        res({options : {yearHtml: years}})   
    })
}

const getTeamOptions = queryTeams => {
    return new Promise((res, rej) => {
        callCustom(queryTeams).then(result => {
            var teams = makeTeamHtml(result.sports[0].leagues[0].teams)
            res({teams})
        })
    })
}

const makeTeamHtml = teamsArr => {
    var sortedTeams = sortTeams(teamsArr)
    var teamOptionsHtml = ``
    sortedTeams.forEach(team => {
        teamOptionsHtml += `
        <option value="${team.team.id}:${team.team.slug}">${team.team.displayName}</option>`
    })
    return teamOptionsHtml
}

const getFootballOptions = (currentScores) => {
    globalDisplayedYear = currentScores.season.year
    globalDisplayedWeek = currentScores.season.type + ':' + currentScores.week.number    
    globalCurrentYear = currentScores.season.year
    
    weekOptions = []
    yearOptions = []
    currentScores.leagues[0].calendar.forEach(seasonType => {
        if (seasonType.value === '1' || seasonType.value === '2' || seasonType.value === '3') {
            seasonType.entries.forEach(week => {
                weekOptions.push(
                    {
                        display: week.alternateLabel,
                        value: seasonType.value + ":" + week.value
                    }
                )
            })
        }
    })
    for(var i=globalCurrentYear; i>=globalCurrentYear-15; i--) {
        yearOptions.push(i)
    }
    return makeOptionHtmls(weekOptions, yearOptions)
}

const makeOptionHtmls = (weekOptions, yearOptions) => {
    var yearHtml = ``
    var weekHtml = ``

    yearOptions.forEach(year => {
        if(year === globalDisplayedYear) {
            yearHtml += `
            <option selected value="${year}">${year}</option>`            
        } else {
            yearHtml += `
            <option value="${year}">${year}</option>`            
        }
    })
    weekOptions.forEach(week => {
        if(week.value === globalDisplayedWeek) {
            weekHtml += `
            <option selected value="${week.value}">${week.display}</option>`            
        } else {
            weekHtml += `
            <option value="${week.value}">${week.display}</option>`            
        }
    })
    return { yearHtml, weekHtml }
}


$('#filters').on('change', '#scheduleSelector', function() {
    var filterYear = $(this).find('#yearSelect').val()
    globalDisplayedYear = parseInt(filterYear)
    var league = $(this).data('league')

    if (league === 'nfl' || league === 'ncaaf') {
        var filterSeasonType = $(this).find('#weekSelect').val().split(":")[0]
        var filterWeek = $(this).find('#weekSelect').val().split(":")[1]
        globalDisplayedWeek = $(this).find('#weekSelect').val()
    } else if (league === 'nba' || league === 'ncaab') {

    }
    var team = $(this).find('#teamSelect').val()
    if (team==='all') {
        if($("#weekSelect").closest(".form-group").hasClass("d-none")){
            $("#weekSelect").closest(".form-group").removeClass("d-none");
        }
        var customQuery = queryStrings[league] + `&dates=${filterYear}&seasontype=${filterSeasonType}&week=${filterWeek}`
        callPromise({[league]: customQuery}, true)        
    } else {
        if(!$("#weekSelect").closest(".form-group").hasClass("d-none")){
            $("#weekSelect").closest(".form-group").addClass("d-none");
        }
        var customQuery = queryTeamStrings[league].split('?')[0] + `/${team.split(':')[0]}/schedule?season=${filterYear}&seasontype=2`
        callPromise({[league]: customQuery}, true)    
    }

})