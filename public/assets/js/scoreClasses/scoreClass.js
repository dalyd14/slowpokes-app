function weekDetails(type, year, week) {
    this.seasonType = type;
    this.seasonYear = year;
    this.weekNum = week;
}

function scoreObj(sport, league, scores) {
    this.sport = sport;
    this.league = league;
    this.scores = scores
}

class gameClass {
    constructor(homeTeam, awayTeam, gameDetails, dateTime, league) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.gameDetails = gameDetails;
        this.dateTime = dateTime;
        this.league = league
    }
    getIfHomeLoss () {
        if(this.gameDetails.status.type.name === "STATUS_FINAL") {
            if (parseInt(this.getHomeScore()) >= parseInt(this.getAwayScore())) {
                return ''
            } else {
                return 'lost'
            }
        } else {
            return ''
        }
    }
    getIfAwayLoss () {
        if(this.gameDetails.status.type.name === "STATUS_FINAL") {
            if (parseInt(this.getAwayScore()) >= parseInt(this.getHomeScore())) {
                return ''
            } else {
                return 'lost'
            }
        } else {
            return ''
        }
    }
    getHomeDetails() {
        var logoLeague = this.league.includes('ncaa') ? 'ncaa' : this.league

        const homeDetails = {
            teamLocation: this.homeTeam.team.location,
            teamName: this.homeTeam.team.name || this.homeTeam.team.shortDisplayName,
            teamAbr: this.homeTeam.team.abbreviation,
            teamId: this.homeTeam.team.id,
            logo: 'https://a.espncdn.com/i/teamlogos/' + logoLeague + '/500/' + this.homeTeam.team.id + '.png',
            // currentRecord: this.homeTeam.records.find(param => param.type === 'total').summary
        }
        return homeDetails
    }
    getHomeScore() {
        switch (this.gameDetails.status.type.name) {
            case 'STATUS_SCHEDULED':
                return ''
            case 'STATUS_POSTPONED':
                return ''
            case 'STATUS_CANCELED':
                return ''
            default:
                if('score' in this.homeTeam) {
                    return this.homeTeam.score.displayValue || this.homeTeam.score
                } else {
                    return ''
                }
                
        }
    }
    getAwayDetails() {
        var logoLeague = this.league.includes('ncaa') ? 'ncaa' : this.league
        const awayDetails = {
            teamLocation: this.awayTeam.team.location,
            teamName: this.awayTeam.team.name || this.awayTeam.team.shortDisplayName,
            teamAbr: this.awayTeam.team.abbreviation,
            teamId: this.awayTeam.team.id,
            logo: 'https://a.espncdn.com/i/teamlogos/' + logoLeague + '/500/' + this.awayTeam.team.id + '.png',
            // currentRecord: this.awayTeam.records.find(param => param.type === 'total').summary 
        }
        return awayDetails
    }
    getAwayScore() {
        switch (this.gameDetails.status.type.name) {
            case 'STATUS_SCHEDULED':
                return ''
            case 'STATUS_POSTPONED':
                return ''
            case 'STATUS_CANCELED':
                return ''
            default:
                if('score' in this.awayTeam) {
                    return this.awayTeam.score.displayValue || this.awayTeam.score
                } else {
                    return ''
                }
                
        }
    }
    getHomeLogo() {
        return this.homeTeam.team.logo
    }
    getQuarterOrDate() {
        switch (this.gameDetails.status.type.name) {
            case 'STATUS_SCHEDULED':
                return moment(this.getDateTime(), 'MMMM Do YYYY, h:mm a').format('M/DD')
            case 'STATUS_IN_PROGRESS':
                return this.gameDetails.status.type.shortDetail.split(' - ')[1] + " qtr"
            case 'STATUS_HALFTIME':
                return 'HALF'
            case 'STATUS_END_PERIOD':
                return this.gameDetails.status.type.shortDetail
            case 'STATUS_FINAL':
                return 'FINAL'
            case 'STATUS_POSTPONED':
                return 'POST'
            case 'STATUS_CANCELED':
                return 'CANC'
            default:
                break;
        }     
    }
    getTimeLeftOrTime() {
        switch (this.gameDetails.status.type.name) {
            case 'STATUS_SCHEDULED':
                return moment( this.getDateTime(), 'MMMM Do YYYY, h:mm a').format('h:mm a')
            case 'STATUS_IN_PROGRESS':
                return this.gameDetails.status.displayClock
            default:
                return '';
        }      
    }
    getDateTime() {
        return this.dateTime
    }
    getNetwork() {
        if(this.gameDetails.broadcasts.some(broadcast => broadcast.market.type === "National")) {
            return this.gameDetails.broadcasts.find(broadcast => broadcast.market.type === "National").media.shortName
        }
        return ''
    }
}