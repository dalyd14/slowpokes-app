const populateFootballFilter = (query) => {
    callCustom(query).then(res => {
        var results = getFootballOptions(res)
        $('#scheduleSelector #yearSelect').html(results.yearHtml)   
        $('#scheduleSelector #weekSelect').html(results.weekHtml)        
    })
}

const getFootballOptions = (currentScores) => {
    var curYearValue = currentScores.season.year
    var curSeasonType = currentScores.season.type
    var curWeek = currentScores.week.number
    var curWeekValue = curSeasonType + ':' + curWeek
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
    for(var i=curYearValue; i>=curYearValue-15; i--) {
        yearOptions.push(i)
    }
    return makeOptionHtmls(weekOptions, yearOptions, curWeekValue, curYearValue)
}

const makeOptionHtmls = (weekOptions, yearOptions, curWeek, curYear) => {
    var yearHtml = ``
    var weekHtml = ``
    yearOptions.forEach(year => {
        if(year === curYear) {
            yearHtml += `
            <option selected value="${year}">${year}</option>`            
        } else {
            yearHtml += `
            <option value="${year}">${year}</option>`            
        }
    })
    weekOptions.forEach(week => {
        if(week.value === curWeek) {
            weekHtml += `
            <option selected value="${week.value}">${week.display}</option>`            
        } else {
            weekHtml += `
            <option value="${week.value}">${week.display}</option>`            
        }
    })

    return { yearHtml, weekHtml }

}