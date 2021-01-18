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
    constructor(homeTeam, awayTeam, gameDetails, dateTime) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.gameDetails = gameDetails;
        this.dateTime = dateTime;        
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
    getHomeScore() {
        switch (this.gameDetails.status.type.name) {
            case 'STATUS_SCHEDULED':
                return ''
            case 'STATUS_POSTPONED':
                return ''
            case 'STATUS_CANCELED':
                return ''
            default:
                return this.homeTeam.score
        }
    }
    getHomeDetails() {
        const homeDetails = {
            teamLocation: this.homeTeam.team.location,
            teamName: this.homeTeam.team.name,
            teamAbr: this.homeTeam.team.abbreviation,
            teamId: this.homeTeam.team.id,
            logo: this.homeTeam.team.logo,
            currentRecord: this.homeTeam.records.find(param => param.type === 'total').summary
        }
        return homeDetails
    }
    getAwayDetails() {
        const awayDetails = {
            teamLocation: this.awayTeam.team.location,
            teamName: this.awayTeam.team.name,
            teamAbr: this.awayTeam.team.abbreviation,
            teamId: this.awayTeam.team.id,
            logo: this.awayTeam.team.logo,
            currentRecord: this.awayTeam.records.find(param => param.type === 'total').summary
        }
        return awayDetails
    }
    getAwayScore() {
        return this.awayTeam.score
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
        return this.gameDetails.geoBroadcasts[0].media.shortName
    }
}