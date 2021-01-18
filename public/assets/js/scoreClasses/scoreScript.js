var globalCurrentYear
var globalDisplayedYear
var globalDisplayedWeek

const populateFootballFilter = (query) => {
    return new Promise((res, rej) => {
        callCustom(query).then(result => {
            var results = getFootballOptions(result)
            res(results)
        })        
    })
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
    var filterSeasonType = $(this).find('#weekSelect').val().split(":")[0]
    var filterWeek = $(this).find('#weekSelect').val().split(":")[1]
    globalDisplayedWeek = $(this).find('#weekSelect').val()
    var league = $(this).data('league')
    var customQuery = queryStrings[league] + `&dates=${filterYear}&seasontype=${filterSeasonType}&week=${filterWeek}`
    callPromise({[league]: customQuery}, true)
})