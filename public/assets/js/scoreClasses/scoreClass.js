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
    getHomeScore() {
        return this.homeTeam.score
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
        return this.homeTeam.score
    }
    getHomeLogo() {
        return this.homeTeam.team.logo
    }
    getQuarterStatus() {
        switch (parseInt(this.gameDetails.status.type.id)) {
            case 1:
                return 'SCHED'
            case 2:
                return this.gameDetails.status.type.shortDetail.split(' - ')[1]
            case 3:
                return 'FINAL'
            case 4:
                return 'POST'
            case 5:
                return 'CANC'
            default:
                break;
        }        
    }
    getTimeLeft() {
        return this.gameDetails.status.displayClock
    }
    getDateTime() {
        return this.dateTime
    }
}